
export async function predictMushroom(image) {
    const formData = new FormData()
    formData.append('file', image)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/predict`, {
        method: 'POST',
        body: formData,
    }
    )

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Prediction failed.')
    }

    return response.json()
}