import { useEffect } from 'react'

export default function MushroomDetailsModal({
    mushroom,
    isOpen,
    onClose
}) {
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

    if (!isOpen || !mushroom) return null

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-mybg shadow-2xl">

                <div className="flex items-start justify-between gap-4 border-b border-mytxt/20 px-5 py-4 sm:px-7 sm:py-5">
                    <div>
                        <h2 className="text-xl font-bold text-mytxt sm:text-2xl">
                            {mushroom.commonName}
                        </h2>

                        <p className="mt-1 text-sm italic text-mybg2 sm:text-base">
                            {mushroom.scientificName}
                        </p>

                        {mushroom.alternativeNames?.length > 0 && (
                            <p className="mt-1 text-xs text-mybg2 sm:text-sm">
                                Also known as:{' '}
                                {mushroom.alternativeNames.join(', ')}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-xl font-bold text-mybg2 transition duration-150 hover:bg-mybg2/10 hover:opacity-80"
                    >
                        ×
                    </button>
                </div>

                <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <div className="overflow-hidden rounded-2xl border border-mytxt/20 bg-white">
                                <img
                                    src={mushroom.image}
                                    alt={mushroom.scientificName}
                                    className="aspect-square w-full object-cover"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-bold text-mytxt">
                                Opis
                            </h3>

                            <p className="text-sm leading-6 text-mybg2">
                                {mushroom.description}
                            </p>

                            <div className="mt-5">
                                <h3 className="mb-3 text-lg font-bold text-mytxt">
                                    Ključne karakteristike
                                </h3>

                                <ul className="">
                                    {mushroom.keyFeatures.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex gap-2 text-sm leading-6 text-mybg2"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mybg2" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">

                        <div className="rounded-xl border border-mytxt/40 p-4">
                            <h3 className="mb-2 font-bold text-mytxt">
                                Stanište
                            </h3>

                            <p className="text-sm leading-6 text-mybg2">
                                {mushroom.habitat}
                            </p>
                        </div>

                        <div className="rounded-xl border border-mytxt/40 p-4">
                            <h3 className="mb-2 font-bold text-mytxt">
                                Informacije o bezbednosti
                            </h3>

                            <p className="text-sm font-semibold leading-6 text-red-600">
                                {mushroom.safety}
                            </p>
                        </div>

                    </div>

                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="text-sm font-semibold leading-6 text-red-600">
                            ⚠️ Ove informacije su namenjene u edukativne svrhe. 
                            Nikada ne konzumirajte gljivu isključivo na osnovu 
                            predviđanja veštačke inteligencije ili informacija prikazanih 
                            u ovoj aplikaciji.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}