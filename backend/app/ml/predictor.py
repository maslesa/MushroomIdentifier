import torch
from torchvision import transforms


IMAGE_SIZE = 224

DEVICE = torch.device('cpu')

CLASS_NAMES = [
    'Agaricus arvensis',
    'Agaricus augustus',
    'Agaricus campestris',
    'Agaricus xanthodermus',
    'Amanita caesarea',
    'Amanita citrina',
    'Amanita excelsa',
    'Amanita muscaria',
    'Amanita pantherina',
    'Amanita phalloides',
    'Amanita rubescens',
    'Amanita virosa',
    'Armillaria mellea',
    'Boletus aereus',
    'Boletus edulis',
    'Boletus pinophilus',
    'Boletus reticulatus',
    'Cantharellus cibarius',
    'Cantharellus pallens',
    'Chlorophyllum rhacodes',
    'Coprinopsis atramentaria',
    'Coprinus comatus',
    'Craterellus cornucopioides',
    'Craterellus tubaeformis',
    'Fomes fomentarius',
    'Gyromitra esculenta',
    'Hericium erinaceus',
    'Hydnum repandum',
    'Lactarius deliciosus',
    'Lactarius deterrimus',
    'Lactarius turpis',
    'Lactifluus volemus',
    'Macrolepiota mastoidea',
    'Macrolepiota procera',
    'Morchella esculenta',
    'Pleurotus ostreatus',
    'Rubroboletus satanas',
    'Russula cyanoxantha',
    'Russula emetica',
    'Russula ochroleuca',
    'Russula vesca',
    'Suillellus luridus',
    'Suillus luteus',
    'Trametes versicolor',
    'Tylopilus felleus',
    'Xerocomellus chrysenteron'
]


transform = transforms.Compose([
    transforms.Resize(
        (IMAGE_SIZE, IMAGE_SIZE)
    ),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[
            0.485,
            0.456,
            0.406
        ],
        std=[
            0.229,
            0.224,
            0.225
        ]
    )
])


def preprocess_image(image):
    tensor = transform(
        image
    )

    return tensor.unsqueeze(0).to(
        DEVICE
    )


def predict(
    model,
    image,
    top_k=3
):
    input_tensor = preprocess_image(
        image
    )

    with torch.inference_mode():
        outputs = model(
            input_tensor
        )

        probabilities = torch.softmax(
            outputs,
            dim=1
        )

        confidence, indices = torch.topk(
            probabilities,
            k=top_k,
            dim=1
        )

    predictions = []

    for score, index in zip(
        confidence[0],
        indices[0]
    ):
        class_index = index.item()

        predictions.append({
            'class_name': CLASS_NAMES[
                class_index
            ],
            'class_index': class_index,
            'confidence': float(
                score.item()
            )
        })

    del input_tensor
    del outputs
    del probabilities
    del confidence
    del indices

    return predictions