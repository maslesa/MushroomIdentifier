export default function GradCAMViewer({ image }) {
  if (!image) {
    return null
  }

  return (
    <div className="w-full max-w-xl">
      <h2 className="mb-4 text-xl font-bold text-mytxt sm:text-2xl">
        Gde model gleda?
      </h2>

      <div className="overflow-hidden rounded-2xl border border-mytxt bg-mybg shadow-sm">

        <div className="w-full">
          <img
            src={
              image.startsWith('data:image')
                ? image
                : `data:image/jpeg;base64,${image}`
            }
            alt="Grad-CAM visualization"
            className="block h-auto w-full object-contain"
          />
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-sm leading-6 text-mytxt italic">
            Grad-CAM vizuelizacija prikazuje regione slike koji 
            su najviše doprineli predviđanju modela.
          </p>
        </div>

      </div>
    </div>
  )
}