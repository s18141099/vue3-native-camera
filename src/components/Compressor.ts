export default class Compressor {
    private image: HTMLImageElement
    private canvas: HTMLCanvasElement
    private quality: number

    constructor({ dataURL, quality }: { dataURL: string, quality: number }) {
        this.image = new Image()
        this.image.src = dataURL

        this.quality = (quality > 1 || quality < 0.1) ? 1 : quality

        this.canvas = document.createElement('canvas')
        document.querySelector("body")?.appendChild(this.canvas)
    }

    public compression = async () => {
        const result = await this.draw()
        this.remove()

        return result
    }

    private draw = (): Promise<string> => new Promise((resolve: (value: string) => void) => {
        const canvas2d = this.canvas.getContext('2d')

        this.image.onload = () => {
            const width = this.image.naturalWidth * this.quality
            const height = this.image.naturalHeight * this.quality

            this.canvas.width = width
            this.canvas.height = height

            canvas2d?.drawImage(this.image, 0, 0, width, height)
            const dataURL = this.canvas.toDataURL('image/jpeg')

            return resolve(dataURL)
        }
    })

    private remove = () => {
        this.canvas.remove()
    }
}