from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[2]
PROJECT_ROOT = BACKEND_DIR.parent

MODEL_PATH = PROJECT_ROOT / 'models' / 'best_convnext_tiny_hyperparameter_tuned.pth'

IMAGE_SIZE = 224
NUM_CLASSES = 46
TOP_K = 3
DEVICE = 'cuda' if __import__('torch').cuda.is_available() else 'cpu'

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
    'Xerocomellus chrysenteron',
]