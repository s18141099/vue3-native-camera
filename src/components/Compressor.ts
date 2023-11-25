export default class Compressor {
    private image: HTMLImageElement
    private canvas: HTMLCanvasElement

    constructor({ dataURL, quality }: { dataURL: string, quality: number }) {
        this.image = new Image()
        this.image.src = dataURL

        if (quality > 1) quality = 1

        this.canvas = document.createElement('canvas')
        this.canvas.width = this.image.naturalWidth * quality
        this.canvas.height = this.image.naturalHeight * quality
        document.querySelector("body")?.appendChild(this.canvas)
    }

    public compression = () => {
        const result = this.draw()
        this.remove()

        return result
    }

    private draw = () => new Promise((resolve: (value: string) => void) => {
        const canvas2d = this.canvas.getContext('2d')

        this.image.onload = () => {
            canvas2d?.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
            const resizebase64 = this.canvas.toDataURL('image/jpeg')

            resolve(resizebase64)
        }
    })

    private remove = () => {
        this.canvas.remove()
    }
}