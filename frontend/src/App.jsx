import { useState } from 'react'

import ImageUploader from './components/ImageUploader'
import PredictionResults from './components/PredictionResults'
import GradCAMViewer from './components/GradCAMViewer'

import { predictMushroom } from './services/api'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handlePrediction(image) {
    try {
      setLoading(true)
      setError(null)
      setResult(null)

      const data = await predictMushroom(image)

      setResult(data)
    } catch (error) {
      console.error(error)

      setError(
        error.message ||
          'Something went wrong while analyzing the image.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-mybg">

      <header className="w-full bg-mybg">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center justify-center gap-2">
            <img
              className="h-9 w-9 sm:h-10 sm:w-10"
              src="/scanmushroom_logo.png"
              alt="Scan mushroom logo"
            />

            <h1 className="text-xl font-bold text-mytxt sm:text-2xl">
              Scan mushroom
            </h1>
          </div>

          <p className="mt-1 text-center text-xs font-bold italic text-mybg2 sm:text-sm">
            AI-powered mushroom species identification
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

          <section className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-3xl font-bold leading-tight text-mytxt sm:mb-4 sm:text-4xl">
              Identify a Mushroom
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-6 text-mybg2 sm:text-base sm:leading-7">
              Upload a photo of a mushroom and our model will predict
              its species and show you which parts of the image
              influenced the prediction.
            </p>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-mybg2 sm:text-base sm:leading-7">
              If you don't have a photo of mushroom, you can download
              it from{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.kaggle.com/datasets/ljubomirmaslea/mushrooms-species-images-classification"
                className="inline-flex items-center gap-1 italic underline transition duration-150 hover:opacity-80"
              >
                Kaggle test directory
              </a>
              .
            </p>
          </section>

          <div className="flex flex-col items-center gap-8 sm:gap-10">

            <ImageUploader
              onPrediction={handlePrediction}
              loading={loading}
            />

            {error && (
              <div className="w-full max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                {error}
              </div>
            )}

            {loading && (
              <div className="text-center">
                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

                <p className="text-sm text-gray-500">
                  Analyzing mushroom...
                </p>
              </div>
            )}

            {result && (
              <div className="flex w-full flex-col items-center gap-8 sm:gap-10">

                <PredictionResults
                  predictions={result.top_predictions}
                />

                <GradCAMViewer
                  image={result.gradcam_image}
                />

                <div className="w-full max-w-xl rounded-xl border border-mytxt bg-mybg p-4">
                  <p className="text-sm font-semibold leading-6 text-red-600">
                    ⚠️ {result.disclaimer}
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full bg-mybg">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:px-6 sm:py-8 md:flex-row md:justify-between md:text-left lg:px-8">

          <p className="text-sm font-bold italic text-mybg2 sm:text-base">
            Powered by{' '}
            <a
              className="cursor-pointer underline transition duration-150 hover:opacity-80"
              href="https://www.maslesa.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              maslesa.
            </a>
          </p>

          <p className="text-sm font-bold italic text-mybg2 sm:text-base">
            Check it out on{' '}
            <a
              className="cursor-pointer underline transition duration-150 hover:opacity-80"
              href="https://github.com/maslesa/MushroomIdentifier"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>

        </div>
      </footer>

    </div>
  )
}

export default App