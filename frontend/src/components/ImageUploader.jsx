import { useRef, useState } from 'react'

export default function ImageUploader({ onPrediction, loading }) {
  const inputRef = useRef(null)

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)

  function handleImageChange(event) {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image.')
      return
    }

    setError(null)
    setImage(file)

    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)
  }

  function handleSubmit() {
    if (!image) {
      setError('Please select an image first.')
      return
    }

    setError(null)
    onPrediction(image)
  }

  function handleReset() {
    setImage(null)
    setPreview(null)
    setError(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-xl">
      <div className="rounded-2xl border-2 border-dashed border-mytxt bg-mybg p-5 text-center shadow-sm sm:p-8">

        {!preview ? (
          <>
            <div className="mb-3 flex w-full items-center justify-center sm:mb-4">
              <img
                className="h-9 w-9 sm:h-10 sm:w-10"
                src="/mushroom.png"
                alt="Mushroom"
              />
            </div>

            <h2 className="text-lg font-bold text-mytxt sm:text-xl">
              Upload a mushroom image
            </h2>

            <p className="mx-auto mb-5 max-w-sm text-sm leading-6 text-mybg2 sm:mb-6">
              Upload an existing photo or take a picture using your camera.
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />

            <label
              htmlFor="image-upload"
              className="inline-flex w-full max-w-xs cursor-pointer items-center justify-center rounded-xl bg-mybg2 px-5 py-3 text-sm font-medium text-white transition duration-150 hover:opacity-80 sm:w-auto sm:px-6 sm:text-base"
            >
              Choose image
            </label>
          </>
        ) : (
          <>
            <div className="mb-5 flex w-full justify-center sm:mb-6">
              <img
                src={preview}
                alt="Selected mushroom"
                className="max-h-64 max-w-full rounded-xl object-contain sm:max-h-80"
              />
            </div>

            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-xl bg-mybg2 px-5 py-3 text-sm font-medium text-white transition duration-150 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6 sm:text-base cursor-pointer"
              >
                {loading ? 'Analyzing...' : 'Identify Mushroom'}
              </button>

              <button
                onClick={handleReset}
                disabled={loading}
                className="w-full rounded-xl border-2 border-mybg2 px-5 py-3 text-sm font-medium text-mybg2 transition duration-150 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6 sm:text-base cursor-pointer"
              >
                Change
              </button>

            </div>
          </>
        )}

        {error && (
          <p className="mt-4 text-sm leading-6 text-red-600">
            {error}
          </p>
        )}

      </div>
    </div>
  )
}