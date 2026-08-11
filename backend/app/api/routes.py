import gc
import io

from fastapi import (
    APIRouter,
    File,
    HTTPException,
    UploadFile
)

from PIL import Image

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

MAX_FILE_SIZE = 10 * 1024 * 1024

ALLOWED_TYPES = {
    'image/jpeg',
    'image/png',
    'image/webp'
}


@router.post(
    '/predict',
    response_model=PredictionResponse
)
async def predict_mushroom(
    file: UploadFile = File(...)
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=(
                'Unsupported image format. '
                'Use JPEG, PNG or WebP.'
            )
        )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail='Image file is too large. Maximum size is 10 MB.'
        )

    try:
        image = Image.open(
            io.BytesIO(contents)
        ).convert('RGB')
    except Exception:
        raise HTTPException(
            status_code=400,
            detail='Invalid image file.'
        )
    finally:
        del contents

    predictions = predict(
        model,
        image
    )

    input_tensor = preprocess_image(
        image
    )

    target_class = predictions[0]['class_index']

    cam = GradCAM(
        model,
        model.features[7]
    )

    try:
        heatmap = cam.generate(
            input_tensor,
            target_class
        )

        gradcam_array = create_gradcam_image(
            image,
            heatmap
        )

        gradcam_image = image_to_base64(
            gradcam_array
        )

        del heatmap
        del gradcam_array

    finally:
        cam.close()

    del input_tensor
    del predictions

    gc.collect()

    predictions = predict(
        model,
        image
    )

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