from pydantic import BaseModel
from typing import List

class Prediction(BaseModel):
    class_name: str
    class_index: int
    confidence: float


class PredictionResponse(BaseModel):
    top_predictions: List[Prediction]
    gradcam_image: str
    disclaimer: str