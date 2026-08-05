# 🍄 Mushroom Identifier — Deep Learning Image Classification

## Overview

Mushroom Identifier is a deep learning-based image classification system designed to recognize mushroom species from images. The project focuses on building a complete computer vision pipeline, including dataset preparation, exploratory data analysis, model training, fine-tuning, evaluation, and model interpretability.

The main goal of this project is to develop a reliable image classification model capable of distinguishing between visually similar mushroom species using modern deep learning techniques.

The project was developed as part of a machine learning research project for **Noć istraživača (Researchers' Night)**.

---

# Problem Description

Identifying mushroom species from images is a challenging computer vision task due to:

- high visual similarity between different species,
- natural variations in appearance,
- different lighting conditions,
- background noise,
- limited visual differences between related species.

The objective is to train a multi-class image classifier that can classify mushroom images into one of **46 different species**.

---

# Dataset

The dataset consists of mushroom images collected and prepared specifically for this project.

## Dataset statistics

| Property | Value |
|---|---:|
| Number of classes | 46 |
| Total images | ~47,000 |
| Image type | RGB images |
| Input size | 224 × 224 |
| Split ratio | 70 / 15 / 15 |


---

# Machine Learning Pipeline

The complete workflow consists of several stages:

1. Data Collection

2. Data Cleaning

3. Dataset Organization

4. Exploratory Data Analysis

5. Train / Validation / Test Split

6. PyTorch Dataset & DataLoader

7. Data Augmentation

8. ConvNeXt Tiny Baseline Model

9. Fine-Tuning

10. Evaluation

11. Grad-CAM Interpretability

12. Hyperparameter Optimization

13. Deployment


---

# Data Preparation

Before model training, the dataset was processed through several preparation steps:

### Data Cleaning

Performed operations:

- removing corrupted images,
- removing duplicate samples,
- removing low-quality images,
- resizing images,
- standardizing file naming.

### Dataset Analysis

Exploratory analysis included:

- dataset statistics,
- class distribution analysis,
- image dimension analysis,
- visualization of samples,
- verification of dataset quality.

---

# Data Augmentation

To improve model generalization and reduce overfitting, data augmentation techniques were applied during training.

Applied transformations:

- random resized crop,
- horizontal flip,
- rotation,
- color jitter,
- normalization.

Validation and test images were only resized and normalized to preserve evaluation consistency.

---

# Model Architecture

## ConvNeXt Tiny

The main classification model used in this project is:

**ConvNeXt Tiny**

ConvNeXt is a modern convolutional neural network architecture inspired by design principles from Vision Transformers while maintaining the efficiency of CNNs.

The model was selected because it provides:

- strong image classification performance,
- efficient feature extraction,
- good transfer learning capabilities.

---

# Training Strategy

## Baseline Training

A pretrained ConvNeXt Tiny model was adapted for mushroom classification.

Training setup:

- Loss function: Cross Entropy Loss
- Optimizer: AdamW
- Learning rate scheduler: Cosine Annealing
- Batch size: 32
- Input resolution: 224 × 224

The classification head was replaced with a custom layer for: 46 mushroom classes


---

# Fine-Tuning

After baseline training, transfer learning was performed.

Fine-tuning strategy:

### Phase 1

- Freeze all feature extraction layers
- Train only the classifier head

### Phase 2

- Unfreeze the final ConvNeXt stage
- Fine-tune high-level feature representations
- Use a smaller learning rate

This approach allows the model to adapt pretrained visual features to mushroom-specific characteristics.

---

# Evaluation

The final model was evaluated on an unseen test set.

Evaluation metrics:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion Matrix
- Per-class accuracy
- Confidence analysis

---

# Final Results

## Fine-Tuned ConvNeXt Tiny

| Metric | Result |
|---|---:|
| Test Accuracy | **85.81%** |
| Macro Precision | 86.07% |
| Macro Recall | 86.02% |
| Macro F1-score | 86.00% |
| Test Images | 7,123 |
| Number of Classes | 46 |

Model performance:

- Correct predictions: 6112 / 7123

- Wrong predictions: 1011 / 7123


---

# Error Analysis

The model performs very well on most mushroom species.

Examples of highly accurate classes:

| Species | Accuracy |
|---|---:|
| Trametes versicolor | 97.81% |
| Morchella esculenta | 97.60% |
| Hericium erinaceus | 97.59% |
| Gyromitra esculenta | 97.18% |

The most challenging classifications were between visually similar species.

Examples:
- Agaricus arvensis - Agaricus campestris
- Lactarius deterrimus - Lactarius deliciosus
- Boletus reticulatus - Boletus edulis


These errors are expected because these species share very similar visual characteristics.

---

# Model Interpretability

To understand model decisions, Grad-CAM visualization is used.

Grad-CAM allows visualization of:

- important image regions,
- features influencing predictions,
- whether the model focuses on relevant mushroom characteristics.

This helps verify that the model learns meaningful visual patterns instead of relying on background information.


---

# Technologies Used

## Machine Learning

- Python
- PyTorch
- Torchvision
- Scikit-learn
- NumPy
- Pandas

## Computer Vision

- ConvNeXt Tiny
- Image preprocessing
- Data augmentation
- Grad-CAM

## Data Analysis

- Matplotlib
- Seaborn
- Jupyter Notebook

---

# Future Improvements

Potential improvements:

- Hyperparameter optimization
- Larger pretrained architectures
- Test-Time Augmentation (TTA)
- Class balancing techniques
- Confidence thresholding
- Mobile deployment
- FastAPI inference service
- React-based web application

---

# Author

Developed as a machine learning computer vision project focused on mushroom species recognition.

---

# License

This project is intended for educational and research purposes.
