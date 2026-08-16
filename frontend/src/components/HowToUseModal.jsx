import { useEffect } from 'react'

const species = [
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

export default function HowToUseModal({ isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen) return

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-mybg shadow-2xl">

                <div className="flex items-center justify-between px-5 py-4 sm:px-7 sm:py-5">
                    <div>
                        <h2 className="text-xl font-bold text-mytxt sm:text-2xl">
                            How it works?
                        </h2>

                        <p className="mt-1 text-xs italic text-mybg2 sm:text-sm">
                            Learn how to use this tool.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl font-bold text-mybg2 transition duration-150 hover:bg-mybg2/10 hover:opacity-80"
                    >
                        ×
                    </button>
                </div>

                <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">

                    <section>
                        <h3 className="mb-4 text-lg font-bold text-mytxt">
                            Identify a mushroom
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2">

                            <div className="rounded-xl border border-mytxt p-4">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-mybg2 text-sm font-bold text-white">
                                    1
                                </div>

                                <h4 className="mb-1 font-bold text-mytxt">
                                    Choose a photo
                                </h4>

                                <p className="text-sm leading-6 text-mybg2">
                                    Upload an existing mushroom photo or take a new picture
                                    using your phone camera.
                                </p>
                            </div>

                            <div className="rounded-xl border border-mytxt p-4">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-mybg2 text-sm font-bold text-white">
                                    2
                                </div>

                                <h4 className="mb-1 font-bold text-mytxt">
                                    Start identification
                                </h4>

                                <p className="text-sm leading-6 text-mybg2">
                                    Press <span className="font-semibold">Identify Mushroom</span>
                                    {' '}and the AI model will analyze your image.
                                </p>
                            </div>

                            <div className="rounded-xl border border-mytxt p-4">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-mybg2 text-sm font-bold text-white">
                                    3
                                </div>

                                <h4 className="mb-1 font-bold text-mytxt">
                                    Check the predictions
                                </h4>

                                <p className="text-sm leading-6 text-mybg2">
                                    The application shows the three species that the model
                                    considers most likely, together with its confidence.
                                </p>
                            </div>

                            <div className="rounded-xl border border-mytxt p-4">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-mybg2 text-sm font-bold text-white">
                                    4
                                </div>

                                <h4 className="mb-1 font-bold text-mytxt">
                                    Explore the explanation
                                </h4>

                                <p className="text-sm leading-6 text-mybg2">
                                    Grad-CAM highlights the areas of the image that influenced
                                    the model's prediction.
                                </p>
                            </div>

                        </div>
                    </section>

                    <section className="mt-7 rounded-xl border border-mytxt p-4 sm:mt-8 sm:p-5">
                        <h3 className="mb-2 text-base font-bold text-red-700 sm:text-lg">
                            ⚠️ Important
                        </h3>

                        <p className="text-sm leading-6 text-red-600 font-semibold">
                            This application is intended for educational and research
                            purposes only. AI predictions are not reliable enough to
                            determine whether a mushroom is safe to eat. Never consume a
                            mushroom based solely on this application.
                        </p>
                    </section>

                    <section className="mt-7 sm:mt-8">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-mytxt">
                                Detectable species
                            </h3>

                            <p className="mt-1 text-sm italic leading-6 text-mybg2">
                                The current model can identify the following 46 mushroom
                                species:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {species.map((name, index) => (
                                <div
                                    key={name}
                                    className="flex items-center gap-3 rounded-lg border border-mytxt/60 px-3 py-2.5"
                                >
                                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-mybg2 text-xs font-bold text-white">
                                        {index + 1}
                                    </span>

                                    <span className="text-sm text-mytxt">
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

            </div>
        </div>
    )
}