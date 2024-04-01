const canvas = document.createElement('canvas')     //canvas,绘制和生成视频截图
const ctx = canvas.getContext('2d')

/**
 * 基于canvas和video元素获取视频截图
 * @param {File | Blob} file    视频文件
 * @param {Number} width        绘制图片宽度
 * @param {height} height       绘制图片高度
 * @param {time} time           绘制事件点
 * @param {Number} sub          按分段截取
 * @param {Boolean} duration    是否返回视频的时长
 * @param {Array} result        用于接收截图的数组
 * @returns 存储截图的数组
 */
export default function ({ file, width, height, time = 0, sub, duration, result = [] }) {

    return new Promise((res, rej) => {

        const video = document.createElement('video')
        video.src = URL.createObjectURL(file)

        if (!(time instanceof Array)) time = [time]
        else time = [...time]

        //初始化canvas的宽高，截取时间段数组
        const canvasInit = () => {
            //如果有传入sub，则按分段时间优先
            if (sub) {
                //计算分段的每个时间点
                const d = Math.floor(video.duration)
                const t = d / sub
                time = [1]
                for (let i = 1; i <= sub; i++) {
                    time[i] = i * t
                }
                time[sub] = time[sub] - 1
            }
            canvas.height = height || video.videoHeight / 1.5
            canvas.width = width || video.videoWidth / 1.5

            video.currentTime = time.shift()
        }

        const ss = () => {

            setTimeout(() => {
                //绘制截图
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                //将截图保存至res数组
                result.push(canvas.toDataURL())
                //时间数组为空，则截取完成
                if (!time.length) {
                    //清除video事件
                    video.removeEventListener('loadedmetadata', canvasInit)
                    video.removeEventListener('seeked', ss)

                    if (duration) return res({ duration: video.duration, imgs: result })
                    return res(result)
                }
                video.currentTime = time.shift()
            }, 66);

        }
        //添加video事件，canvas初始化须在video的“loadedmetadata”事件中执行1，截图获取则须在“timeupdate”事件中执行
        video.addEventListener('loadedmetadata', canvasInit)
        video.addEventListener('seeked', ss)
        video.addEventListener('error', () => {
            video.removeEventListener('loadedmetadata', canvasInit)
            video.removeEventListener('seeked', ss)
            rej('video loaderror')
        })

    })

}


