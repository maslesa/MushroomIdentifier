import torch
from torchvision.models import convnext_tiny
from pathlib import Path

NUM_CLASSES = 46

MODEL_PATH = (
    Path(__file__).resolve().parents[3]
    / 'models'
    / 'best_convnext_tiny_hyperparameter_tuned.pth'
)

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_model():
    model = convnext_tiny(
        weights=None
    )

    model.classifier[2] = torch.nn.Linear(
        model.classifier[2].in_features,
        NUM_CLASSES
    )

    checkpoint = torch.load(
        MODEL_PATH,
        map_location=DEVICE
    )

    if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
        model.load_state_dict(checkpoint['model_state_dict'])
    else:
        model.load_state_dict(checkpoint)

    model.to(DEVICE)
    model.eval()

    return model


model = load_model()