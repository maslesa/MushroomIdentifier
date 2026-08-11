import torch
from torchvision.models import convnext_tiny
from huggingface_hub import hf_hub_download

NUM_CLASSES = 46

HF_REPO_ID = 'maslesa/mushroom-convnext-tiny'
MODEL_FILENAME = 'best_convnext_tiny_hyperparameter_tuned.pth'

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_model():
    model_path = hf_hub_download(
        repo_id=HF_REPO_ID,
        filename=MODEL_FILENAME
    )

    model = convnext_tiny(
        weights=None
    )

    model.classifier[2] = torch.nn.Linear(
        model.classifier[2].in_features,
        NUM_CLASSES
    )

    checkpoint = torch.load(
        model_path,
        map_location=DEVICE
    )

    if (
        isinstance(checkpoint, dict)
        and 'model_state_dict' in checkpoint
    ):
        model.load_state_dict(
            checkpoint['model_state_dict']
        )
    else:
        model.load_state_dict(checkpoint)

    model.to(DEVICE)
    model.eval()

    return model


model = load_model()