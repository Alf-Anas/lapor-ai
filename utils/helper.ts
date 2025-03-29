import imageCompression from 'browser-image-compression'

export function formatDecimalNumber(
    value: number,
    decimal = 2
): string | number {
    if (!value) return 0
    return value % 1 !== 0 ? value.toFixed(decimal) : value
}

export async function compressImage(imageFile: File): Promise<string> {
    const options = {
        maxSizeMB: 0.65,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
        maxIteration: 20,
    }
    const compressImageFile = await imageCompression(imageFile, options)
    return fileToBase64(compressImageFile)
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file) // Read file as Base64

        reader.onload = () => resolve(reader.result as string) // Resolve with Base64 string
        reader.onerror = (error) => reject(error) // Handle errors
    })
}
