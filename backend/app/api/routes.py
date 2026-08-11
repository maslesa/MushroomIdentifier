from fastapi import APIRouter, File, UploadFile, HTTPException
from PIL import Image
import io
from ..schemas.prediction import PredictionResponse
from ..ml.model import model
from ..ml.predictor import (
    preprocess_image,
    predict
)
from ..ml.gradcam import (
    GradCAM,
    create_gradcam_image,
    image_to_base64
)

router = APIRouter()

@router.post('/predict', response_model=PredictionResponse)
async def predict_mushroom(
    file: UploadFile = File(...)
):
    allowed_types = {
        'image/jpeg',
        'image/png',
        'image/webp'
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=(
                'Unsupported image format. '
                'Use JPEG, PNG or WebP.'
            )
        )

    contents = await file.read()

    try:
        image = Image.open(io.BytesIO(contents))
        image = image.convert('RGB')
    except Exception:
        raise HTTPException(
            status_code=400,
            detail='Invalid image file.'
        )

    predictions = predict(model, image)
    input_tensor = preprocess_image(image)
    target_class = predictions[0]['class_index']

    cam = GradCAM(model, model.features[7])

    heatmap = cam.generate(input_tensor, target_class)
    gradcam_array = create_gradcam_image(image, heatmap)
    gradcam_image = image_to_base64(gradcam_array)
    cam.close()

    return {
        'top_predictions': predictions,
        'gradcam_image': gradcam_image,
        'disclaimer': (
            'This application provides AI-based '
            'mushroom identification for educational '
            'and research purposes only. Predictions '
            'must not be used to determine whether '
            'a mushroom is safe to eat.'
        )
    }