import { useState } from 'react'

import mushrooms from '../data/mushrooms.json'
import MushroomDetailsModal from './MushroomDetailsModal'

export default function PredictionResults({ predictions }) {
  const [selectedMushroom, setSelectedMushroom] = useState(null)

  if (!predictions || predictions.length === 0) {
    return null
  }

  function handleMushroomClick(className) {
    const mushroom = mushrooms.find(
      (item) => item.scientificName === className
    )

    if (!mushroom) {
      return
    }

    setSelectedMushroom(mushroom)
  }

  function handleModalClose() {
    setSelectedMushroom(null)
  }

  return (
    <>
      <div className="w-full max-w-xl">
        <h2 className="mb-4 text-xl font-bold text-mytxt sm:text-2xl">
          Predikcije
        </h2>

        <div className="space-y-3">
          {predictions.map((prediction, index) => {
            const confidence = prediction.confidence * 100

            return (
              <button
                key={prediction.class_index}
                type="button"
                onClick={() =>
                  handleMushroomClick(prediction.class_name)
                }
                className="group w-full cursor-pointer rounded-xl border border-mytxt bg-mybg p-3 text-left shadow-sm transition duration-150 hover:bg-mybg2/10 sm:p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-2 sm:gap-3">

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mybg2 text-xs font-bold text-mybg sm:h-8 sm:w-8 sm:text-sm">
                      {index + 1}
                    </span>

                    <span className="truncate text-sm font-semibold text-mytxt sm:text-base">
                      {prediction.class_name}
                    </span>

                  </div>

                  <span className="shrink-0 text-sm font-semibold text-mytxt sm:text-base">
                    {confidence.toFixed(2)}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-mybg2 transition-all duration-500"
                    style={{
                      width: `${confidence}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs italic text-mybg2">
                  Klikni za više informacija
                </p>
              </button>
            )
          })}
        </div>
      </div>

      <MushroomDetailsModal
        mushroom={selectedMushroom}
        isOpen={Boolean(selectedMushroom)}
        onClose={handleModalClose}
      />
    </>
  )
}