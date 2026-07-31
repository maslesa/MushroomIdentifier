from pathlib import Path
from sklearn.model_selection import train_test_split
import random
import shutil

SEED = 42
TRAIN_SIZE = 0.7
VAL_SIZE = 0.15
TEST_SIZE = 0.15

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent

DATASET_DIR = PROJECT_DIR / 'dataset'
TRAIN_DIR = DATASET_DIR / 'train'
VAL_DIR = DATASET_DIR / 'validation'
TEST_DIR = DATASET_DIR / 'test'

VALID_EXTENSIONS = ['.jpg', '.png']

# check if sizes of train + validation + test datasets is 1
assert abs(TRAIN_SIZE + VAL_SIZE + TEST_SIZE - 1) < 1e-6

random.seed(SEED)

species_folders = sorted([
    folder for folder in DATASET_DIR.iterdir()
    if (folder.is_dir() and folder.name not in {'train', 'validation', 'test'})
])

print('Creating dataset split started...\n')

summary = []

for species in species_folders:
    images = sorted([
        image for image in species.iterdir()
        if image.suffix.lower() in VALID_EXTENSIONS
    ])

    if len(images) == 0:
        print(f'Skipping empty folder: {species}')
        continue

    train_images, temp_images = train_test_split(
        images,
        train_size=TRAIN_SIZE,
        random_state=SEED,
        shuffle=True,
    )

    validation_ratio = VAL_SIZE / (VAL_SIZE + TEST_SIZE)

    validation_images, test_images = train_test_split(
        temp_images,
        train_size=validation_ratio,
        random_state=SEED,
        shuffle=True,
    )

    for split_name, split_images in [
        ('train', train_images),
        ('validation', validation_images),
        ('test', test_images),
    ]:
        destination_folder = (DATASET_DIR / split_name / species.name)
        destination_folder.mkdir(parents=True, exist_ok=True)

        for image in split_images:
            shutil.move(image, destination_folder / image.name)

    summary.append({
        'species': species.name,
        'train': len(train_images),
        'validation': len(validation_images),
        'test': len(test_images),
        'total': len(images),
    })

print('=' * 60)
print('DATASET SPLIT SUMMARY')
print('=' * 60)

total_train = 0
total_validation = 0
total_test = 0

for row in summary:
    total_train += row['train']
    total_validation += row['validation']
    total_test += row['test']

    print(
        f"{row['species']:<35}"
        f"{row['train']:>6}"
        f"{row['validation']:>8}"
        f"{row['test']:>8}"
    )

print('-' * 60)
print(f'{'TOTAL':<35}{total_train:>6}{total_validation:>8}{total_test:>8}')

print('\nDataset successfully split.')
