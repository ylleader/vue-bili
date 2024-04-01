
export default class videoPreview {
    /**
     * 
     * @param {Number} row 合成图片中缩略图总行数 
     * @param {Number} column 合成图片中缩略图总列数 
     * @param {Number} interval 合成图片中缩略图的时间间隔
     */
    constructor({ row, column, interval }) {
        this.row = row
        this.column = column
        this.interval = interval
        this.canvasImages = []
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })
    }
    /**
     * 添加合成图
     * @param {String} src   合成图地址 
     * @param {Number} time  缩略图所处时间点
     * @returns 
     */
    addImg(src, time) {
        return new Promise((res, rej) => {
            //计算当前时间time，缩略图所处于第几张合成图中
            const canvasImageIndex = Math.ceil(time / (this.row * this.column * this.interval) || 1)
            this.canvasImageIndex = canvasImageIndex            
            if (this.canvasImages[canvasImageIndex]) return res('load')
            //创建canvas用于绘制合成图，存储于canvasImages中用于后续剪切缩略图
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d', { willReadFrequently: true })
            this.canvasImages[canvasImageIndex] = {canvas, ctx}
            //加载合成图
            const image = new Image()
            image.src = src
            image.onload = () => {
                //初始化绘制合成图的canvas
                canvas.width = image.width
                canvas.height = image.height
                //获取缩略图的宽高
                this.prevWidth = image.width / this.column
                this.prevHeight = image.height / this.row
                //初始化绘制缩略图的canvas
                this.canvas.width = this.prevWidth
                this.canvas.height = this.prevHeight
                //绘制合成图
                ctx.drawImage(image, 0, 0, image.width, image.height)
                //图片加载完毕
                this.canvasImages[canvasImageIndex].load = true
                res('load')
            }
            image.onerror = () => {
                this.canvasImages[canvasImageIndex] = null
                rej('error')
            }
        })
    }
    /**
     * 裁剪缩略图
     * @param {Number} time  缩略图时间点 
     * @returns 缩略图base64
     */
    drawImg(time) {
        if (!this.prevWidth && !this.prevHeight) return
        //计算缩略图在合成图中的位置（第几张）
        const index = Math.ceil((time % (this.column * this.row * this.interval + 1) || 1) / this.interval)
        //计算缩略图所在的行和列
        const row = Math.ceil(index / this.row) - 1
        const column = (Math.ceil(index % this.column) || this.column) - 1
        //绘制缩略图
        this.ctx.putImageData(this.canvasImages[this.canvasImageIndex].ctx.getImageData(column * this.prevWidth, row * this.prevHeight, this.prevWidth, this.prevHeight), 0, 0)
        return this.canvas.toDataURL()
    }
}