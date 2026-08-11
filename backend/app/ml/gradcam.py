import base64
import io

import cv2
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.activations = None
        self.gradients = None
        self.forward_handle = target_layer.register_forward_hook(
            self._save_activations
        )
        self.backward_handle = target_layer.register_full_backward_hook(
            self._save_gradients
        )

    def _save_activations(self, module, input, output):
        self.activations = output

    def _save_gradients(self, module, grad_input, grad_output):
        self.gradients = grad_output[0]

    def generate(self, input_tensor, target_class):
        self.model.zero_grad()

        output = self.model(input_tensor)

        target = output[:, target_class]
        target.backward()

        activations = self.activations
        gradients = self.gradients

        weights = gradients.mean(
            dim=(2, 3),
            keepdim=True
        )

        cam = (weights * activations).sum(dim=1)
        cam = F.relu(cam)
        cam = cam.squeeze(0)
        cam -= cam.min()
        if cam.max() > 0:
            cam /= cam.max()

        cam = cam.detach().cpu().numpy()

        return cam

    def close(self):
        self.forward_handle.remove()
        self.backward_handle.remove()


def create_gradcam_image(image, cam):
    original = np.array(image)
    height, width = original.shape[:2]
    cam = cv2.resize(cam, (width, height))
    cam = np.uint8(255 * cam)
    heatmap = cv2.applyColorMap(cam, cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    overlay = cv2.addWeighted(
        original,
        0.6,
        heatmap,
        0.4,
        0
    )

    return overlay


def image_to_base64(image_array):
    image = Image.fromarray(image_array)
    buffer = io.BytesIO()
    image.save(
        buffer,
        format='JPEG',
        quality=90
    )
    encoded = base64.b64encode(
        buffer.getvalue()
    ).decode('utf-8')

    return f'data:image/jpeg;base64,{encoded}'