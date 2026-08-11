import torch

from PIL import Image
from torchvision import transforms

from ..core.config import DEVICE, IMAGE_SIZE, CLASS_NAMES, TOP_K

transform = transforms.Compose([
    transforms.Resize(
        (IMAGE_SIZE, IMAGE_SIZE)
    ),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def preprocess_image(image: Image.Image) -> torch.Tensor:
    image = image.convert('RGB')
    tensor = transform(image)
    tensor = tensor.unsqueeze(0)
    return tensor.to(DEVICE)


def predict(model, image: Image.Image):
    image_tensor = preprocess_image(image)

    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        top_probabilities, top_indices = torch.topk(
            probabilities,
            k=TOP_K,
            dim=1
        )

    top_probabilities = (
        top_probabilities[0]
        .cpu()
        .numpy()
    )

    top_indices = (
        top_indices[0]
        .cpu()
        .numpy()
    )

    predictions = []

    for probability, index in zip(top_probabilities, top_indices):
        predictions.append({
            'class_name': CLASS_NAMES[index],
            'class_index': int(index),
            'confidence': float(probability)
        })

    return predictions