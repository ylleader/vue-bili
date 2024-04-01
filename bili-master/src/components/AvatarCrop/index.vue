<template>
    <div class="avatar-set" ref="avatarSet">
        <div class="avatar-content">
            <div class="o-c" v-if="isChoose">
                <div class="op-box">
                    <div class="img-container" ref="imgContainer">
                        <img class="refer-img " :src="img" alt="111" @load="imgInit" ref="referImg">
                        <img class="back-img" :src="img" alt="111"
                            :style="{ width: backImgStyle.width + 'px', height: backImgStyle.height + 'px' }" ref="backImg">
                        <div class="crop"
                            :style="{ top: cropStyle.top + 'px', left: cropStyle.left + 'px', width: cropStyle.width + 'px', height: cropStyle.height + 'px' }"
                            @mousedown="cropMousedown" @mouseup="cropMouseup" @wheel="wheelScale" ref="crop">
                            <div class="crop-img"
                                :style="{ width: cropStyle.width + 'px', height: cropStyle.height + 'px' }">
                                <img :src="img" alt="111"
                                    :style="{ top: cropImgStyle.top + 'px', left: cropImgStyle.left + 'px', width: backImgStyle.width + 'px', height: backImgStyle.height + 'px' }">
                            </div>
                            <div class="corner lt" @mousedown="cornerMousedown($event, 'lt')" @mouseup="cornerMouseup">
                            </div>
                            <div class="corner rt" @mousedown="cornerMousedown($event, 'rt')" @mouseup="cornerMouseup">
                            </div>
                            <div class="corner rb" @mousedown="cornerMousedown($event, 'rb')" @mouseup="cornerMouseup">
                            </div>
                            <div class="corner lb" @mousedown="cornerMousedown($event, 'lb')" @mouseup="cornerMouseup">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flie-choice" @click="chooseFile">
                    <svg data-v-94c9e06a="" data-v-0b1c01f8="" width="12" height="12" viewBox="0 0 12 12" class="loop">
                        <path data-v-94c9e06a="" data-v-0b1c01f8="" fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 6.002C12 3.142 10.205.664 7.683.024a.75.75 0 0 0-.369 1.454C9.15 1.943 10.5 3.807 10.5 6c0 1.8-.908 3.38-2.25 4.144V8.25a.75.75 0 0 0-1.499 0v2.796c0 .045.004.089.013.132a.75.75 0 0 0 .932.798c2.516-.643 4.304-3.118 4.304-5.973ZM4.524.005H4.49a.757.757 0 0 0-.172.022C1.797.658 0 3.14 0 6.004c0 2.86 1.788 5.337 4.304 5.974a.75.75 0 0 0 .367-1.454C2.846 10.062 1.5 8.198 1.5 6.004c0-1.805.91-3.385 2.25-4.147V3.55a.75.75 0 0 0 1.5 0V.745a.75.75 0 0 0-.023-.173l-.01-.04A.654.654 0 0 0 5.155.39.756.756 0 0 0 4.58.01h.001a.665.665 0 0 0-.056-.004Z">
                        </path>
                    </svg>
                    <span class="choice-text">重新选择</span>
                </div>
            </div>
            <div class="choice-btn" v-else>
                <BButton width="180px" height="86px" type="l-gray" @click="chooseFile">
                    <i class="iconfont icon-icon"></i>
                    选择本地图片
                </BButton>
            </div>
            <div class="split-line">

            </div>
            <div class="i-p">
                <div class="preview">
                    <img :src="img || avatar" alt="111"
                        :style="{ top: preViewImgStyle.top + 'px', left: preViewImgStyle.left + 'px', width: preViewImgStyle.width + 'px', height: preViewImgStyle.height + 'px' }"
                        ref="preImg">
                </div>
                <div class="p-text" v-text="isChoose ? '预览头像' : '当前头像'"></div>
            </div>
        </div>
        <input type="file" class="upload-input" accept=".jpg,.png,.jepg" @change="chooseLocalImg" ref="uploadInput">
        <div class="upload-tip">
            请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M
        </div>
        <BButton width="140px" height="40px" :disabled="!isChoose" :type="isChoose ? 'blue' : 'l-gray'" @click="cropImg">
            更新</BButton>
    </div>
</template>

<script>

import BButton from '@/components/Common/Button'
import { upload } from '@/api/upload'

export default {
    name: 'AvatarCrop',
    components: { BButton },
    data() {
        return {
            img: this.$store.state.user.userInfo.avatar,
            isChoose: false,
            backImgStyle: {
                width: '',
                height: ''
            },
            cropStyle: {
                left: 0,
                top: 0,
                width: '',
                height: '',
            },
            cropImgStyle: {
                left: 0,
                top: 0
            },
            preViewImgStyle: {
                left: 0,
                top: 0,
                width: 140,
                height: 140,
            }
        }
    },
    computed: {
        avatar() {
            return this.$store.state.user.userInfo.avatar
        }
    },
    methods: {
        chooseLocalImg() {
            //读取选取的本地图片
            const fileReader = new FileReader()
            //将图片转成base64格式
            fileReader.readAsDataURL(this.$refs.uploadInput.files[0])
            fileReader.onload = () => {
                if (!this.isChoose) this.isChoose = true
                this.img = fileReader.result
            }
        },
        cropImg() {

            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            //设置裁剪原图为预览图的2倍
            const w = this.preViewImgStyle.width * 2
            const h = this.preViewImgStyle.height * 2

            const img = new Image()
            img.width = w
            img.height = h
            img.src = this.img
            img.onload = () => {

                canvas.height = h
                canvas.width = w

                //使用canvas绘制裁剪原图
                ctx.drawImage(img, 0, 0, w, h)
                //获取裁剪区域数据
                const cutImage = ctx.getImageData(-this.preViewImgStyle.left * 2, -this.preViewImgStyle.top * 2, 280, 280)
                //设置canvas为裁剪图片的大小
                canvas.width = 280;
                canvas.height = 280;
                //绘制裁剪的图片
                ctx.putImageData(cutImage, 0, 0)


                const base64Img = canvas.toDataURL('image/jpeg');
                const Uint8Img = this.transform(base64Img);
                const formData = new FormData()
                formData.append("files", new Blob([Uint8Img], { type: "image/png" }));

                upload(formData).then(res => {
                    this.$msg.success('更新成功');
                    this.$store.dispatch('user/getUserInfo')
                }).catch(err => {
                    console.log(err)
                })


                // this.$store.dispatch('user/tSetAvatar', canvas.toDataURL('image/png'))
                // this.$msg.success({
                //     msg: '更新新成功',
                //     container: this.$refs.avatarSet
                // })
                this.isChoose = false
            }

        },
        chooseFile() {
            this.$refs.uploadInput.click()
        },
        cropMousedown(e) {
            this.cropMDown = true
            this.cropEvent = {
                ox: e.offsetX,
                oy: e.offsetY,
                icRect: this.$refs.imgContainer.getBoundingClientRect(),

                icw: this.$refs.imgContainer.clientWidth,
                ich: this.$refs.imgContainer.clientHeight
            }
            window.addEventListener('mousemove', this.cropMousemove)
            window.addEventListener('mouseup', this.cropMouseup)
        },
        cropMouseup() {
            this.cropMDown = false
            window.removeEventListener('mousemove', this.cropMousemove)
            window.removeEventListener('mouseup', this.cropMouseup)
        },
        cropMousemove(e) {
            if (this.cropMDown) {
                let left = e.clientX - this.cropEvent.icRect.left - this.cropEvent.ox
                let top = e.clientY - this.cropEvent.icRect.top - this.cropEvent.oy

                const maxl = this.cropEvent.icw - this.cropStyle.width
                const maxt = this.cropEvent.ich - this.cropStyle.height

                if (left < 0) {
                    left = 0
                } else if (left > maxl) {
                    left = maxl
                }

                if (top < 0) {
                    top = 0
                } else if (top > maxt) {
                    top = maxt
                }

                let lp = maxl === 0 ? 1 : left / maxl
                let tp = maxt === 0 ? 1 : top / maxt

                this.cropStyle.left = left
                this.cropStyle.top = top

                this.cropImgStyle = {
                    left: -left,
                    top: -top
                }

                this.preViewImgStyle.left = -(this.preViewImgStyle.width - 140) * lp
                this.preViewImgStyle.top = -(this.preViewImgStyle.height - 140) * tp

            }
        },
        cornerMousedown(e, corner) {
            e.stopPropagation()
            this.cornerDown = true
            this.cornerEvent = {
                x: e.clientX,
                y: e.clientY,
                w: this.cropStyle.width,
                h: this.cropStyle.height,
                t: this.cropStyle.top,
                l: this.cropStyle.left,
                b: this.$refs.imgContainer.clientHeight - this.cropStyle.top - this.cropStyle.height,
                r: this.$refs.imgContainer.clientWidth - this.cropStyle.left - this.cropStyle.width,

                icw: this.$refs.imgContainer.offsetWidth,
                ich: this.$refs.imgContainer.offsetHeight,

                cit: this.cropImgStyle.top,
                cil: this.cropImgStyle.left,

                pw: this.preViewImgStyle.width,
                ph: this.preViewImgStyle.height,
                pl: this.preViewImgStyle.left,
                pt: this.preViewImgStyle.top,
                corner: corner
            }
            window.addEventListener('mousemove', this.cornerMousemove)
            window.addEventListener('mouseup', this.cornerMouseup)
        },
        cornerMouseup(e) {
            this.cornerDown = false
            window.removeEventListener('mousemove', this.cornerMousemove)
            window.removeEventListener('mouseup', this.cornerMouseup)
        },
        cornerMousemove(e) {
            if (this.cornerDown) {
                this[this.cornerEvent.corner](e)
            }
        },
        lt(e) {
            let x = e.clientX - this.cornerEvent.x
            let w = this.cornerEvent.w - x

            const maxw = this.cornerEvent.icw - this.cornerEvent.r
            const maxh = this.cornerEvent.ich - this.cornerEvent.b
            if (w > maxw || w > maxh) {
                w = maxw > maxh ? maxh : maxw
            } else if (w < 20) (
                w = 20
            )

            const differ = w - this.cornerEvent.w

            this.cropStyle.width = w
            this.cropStyle.height = w
            this.cropStyle.left = this.cornerEvent.l - differ
            this.cropStyle.top = this.cornerEvent.t - differ

            this.cropImgStyle.left = this.cornerEvent.cil + differ
            this.cropImgStyle.top = this.cornerEvent.cit + differ

            this.preViewImgStyle.width = this.cornerEvent.pw / (w / this.cornerEvent.w)
            this.preViewImgStyle.height = this.cornerEvent.ph / (w / this.cornerEvent.h)
            this.preViewImgStyle.left = (this.cornerEvent.pl + differ * (this.cornerEvent.pw / this.cornerEvent.icw)) / (w / this.cornerEvent.w)
            this.preViewImgStyle.top = (this.cornerEvent.pt + differ * (this.cornerEvent.pw / this.cornerEvent.icw)) / (w / this.cornerEvent.h)

        },
        lb(e) {
            let x = e.clientX - this.cornerEvent.x
            let w = this.cornerEvent.w - x

            const maxw = this.cornerEvent.icw - this.cornerEvent.r
            const maxh = this.cornerEvent.ich - this.cornerEvent.t
            if (w > maxw || w > maxh) {
                w = maxw > maxh ? maxh : maxw
            } else if (w < 20) (
                w = 20
            )

            const differ = w - this.cornerEvent.w

            this.cropStyle.width = w
            this.cropStyle.height = w
            this.cropStyle.left = this.cornerEvent.l - differ

            this.cropImgStyle.left = this.cornerEvent.cil + differ

            this.preViewImgStyle.width = this.cornerEvent.pw / (w / this.cornerEvent.w)
            this.preViewImgStyle.height = this.cornerEvent.ph / (w / this.cornerEvent.h)
            this.preViewImgStyle.left = (this.cornerEvent.pl + differ * (this.cornerEvent.pw / this.cornerEvent.icw)) / (w / this.cornerEvent.w)
            this.preViewImgStyle.top = this.cornerEvent.pt / (w / this.cornerEvent.h)
        },
        rt(e) {
            let x = e.clientX - this.cornerEvent.x
            let w = this.cornerEvent.w + x

            const maxw = this.cornerEvent.icw - this.cornerEvent.l
            const maxh = this.cornerEvent.ich - this.cornerEvent.b
            if (w > maxw || w > maxh) {
                w = maxw > maxh ? maxh : maxw
            } else if (w < 20) (
                w = 20
            )

            const differ = w - this.cornerEvent.w

            this.cropStyle.width = w
            this.cropStyle.height = w
            this.cropStyle.top = this.cornerEvent.t - differ

            this.cropImgStyle.top = this.cornerEvent.cit + differ

            this.preViewImgStyle.width = this.cornerEvent.pw / (w / this.cornerEvent.w)
            this.preViewImgStyle.height = this.cornerEvent.ph / (w / this.cornerEvent.h)
            this.preViewImgStyle.left = this.cornerEvent.pl / (w / this.cornerEvent.w)
            this.preViewImgStyle.top = (this.cornerEvent.pt + differ * (this.cornerEvent.pw / this.cornerEvent.icw)) / (w / this.cornerEvent.h)
        },
        rb(e) {
            let x = e.clientX - this.cornerEvent.x
            let w = this.cornerEvent.w + x

            const maxw = this.cornerEvent.icw - this.cornerEvent.l
            const maxh = this.cornerEvent.ich - this.cornerEvent.t

            if (w > maxw || w > maxh) {
                w = maxw > maxh ? maxh : maxw
            } else if (w < 20) (
                w = 20
            )

            this.cropStyle.width = w
            this.cropStyle.height = w
            this.preViewImgStyle.width = this.cornerEvent.pw / (w / this.cornerEvent.w)
            this.preViewImgStyle.height = this.cornerEvent.ph / (w / this.cornerEvent.h)
            this.preViewImgStyle.left = this.cornerEvent.pl / (w / this.cornerEvent.w)
            this.preViewImgStyle.top = this.cornerEvent.pt / (w / this.cornerEvent.h)
        },
        imgInit() {
            setImmediate(() => {

                let icw = this.$refs.referImg.offsetWidth
                let ich = this.$refs.referImg.offsetHeight

                if (icw > ich) {

                    if (icw < 180) {
                        ich = 180 * ich / icw
                        icw = 180
                    }

                    this.backImgStyle.width = icw
                    this.backImgStyle.height = ich

                    this.cropStyle.maxSize = ich
                    this.cropStyle.height = ich
                    this.cropStyle.width = ich

                    this.preViewImgStyle.height = 140
                    this.preViewImgStyle.width = 140 * icw / ich

                } else {

                    if (ich < 180) {
                        icw = 180 * icw / ich
                        ich = 180
                    }

                    this.backImgStyle.width = icw
                    this.backImgStyle.height = ich

                    this.cropStyle.maxSize = icw
                    this.cropStyle.height = icw
                    this.cropStyle.width = icw

                    this.preViewImgStyle.width = 140
                    this.preViewImgStyle.height = 140 * ich / this.cropStyle.width
                }

                this.cropStyle.left = 0
                this.cropStyle.top = 0

                this.preViewImgStyle.left = 0
                this.preViewImgStyle.top = 0

                this.cropImgStyle.left = 0
                this.cropImgStyle.top = 0

            })
        },
        wheelScale(e) {
            e.preventDefault()
            let s = 6
            let t = 3, l = 3

            const icw = this.$refs.imgContainer.clientWidth
            const ich = this.$refs.imgContainer.clientHeight
            if (e.wheelDelta > 0) {

                if (this.cropStyle.width + s >= this.cropStyle.maxSize) {
                    s = this.cropStyle.maxSize - this.cropStyle.width
                    t = l = s / 2
                }

                if (this.cropStyle.left - l <= 0) {
                    l = this.cropStyle.left - 0
                } else if (this.cropStyle.left - l + this.cropStyle.width + s > icw) {
                    l = s - (icw - this.cropStyle.width - this.cropStyle.left)
                } else if (this.cropStyle.left - l + this.cropStyle.width + s == icw) {
                    l = s
                }

                if (this.cropStyle.top - t <= 0) {
                    t = this.cropStyle.top - 0
                } else if (this.cropStyle.top - t + this.cropStyle.height + s > ich) {
                    t = s - (ich - this.cropStyle.height - this.cropStyle.top)
                } else if (this.cropStyle.top - t + this.cropStyle.height + s == ich) {
                    t = s
                }

                this.cropStyle.width += s
                this.cropStyle.height += s
                this.cropStyle.left -= l
                this.cropStyle.top -= t

                this.cropImgStyle.left += l
                this.cropImgStyle.top += t

                const wp = this.preViewImgStyle.width / icw
                const sp = this.cropStyle.width / (this.cropStyle.width - s)
                this.preViewImgStyle.left = (this.preViewImgStyle.left + l * wp) / sp
                this.preViewImgStyle.top = (this.preViewImgStyle.top + t * wp) / sp
                if (this.preViewImgStyle.top > 0) {
                    this.preViewImgStyle.top = 0
                }
                if (this.preViewImgStyle.left > 0) {
                    this.preViewImgStyle.left = 0
                }

                this.preViewImgStyle.width = this.preViewImgStyle.width / sp
                this.preViewImgStyle.height = this.preViewImgStyle.height / sp

            } else {

                if (this.cropStyle.width - s < 20) {
                    s = this.cropStyle.width - 20
                    t = l = s / 2
                }

                this.cropStyle.width -= s
                this.cropStyle.height -= s
                this.cropStyle.left += l
                this.cropStyle.top += t

                this.cropImgStyle.left -= l
                this.cropImgStyle.top -= t

                const wp = this.preViewImgStyle.width / icw
                const sp = this.cropStyle.width / (this.cropStyle.width + s)
                this.preViewImgStyle.left = (this.preViewImgStyle.left - l * wp) / sp
                this.preViewImgStyle.top = (this.preViewImgStyle.top - t * wp) / sp

                if (this.preViewImgStyle.top > 0) {
                    this.preViewImgStyle.top = 0
                }
                if (this.preViewImgStyle.left > 0) {
                    this.preViewImgStyle.left = 0
                }

                this.preViewImgStyle.width = this.preViewImgStyle.width / sp
                this.preViewImgStyle.height = this.preViewImgStyle.height / sp
            }


        },
        transform(b64Image) {
            const img = atob(b64Image.split(",")[1]);
            const image = [];
            let i = 0;
            while (i < img.length) {
                image.push(img.charCodeAt(i));
                i++;
            }
            return new Uint8Array(image);
        }
    }
}
</script>

<style lang="scss" scoped>
.avatar-set {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar-content {
        position: relative;
        height: 180px;
        padding: 30px 20px;
        display: flex;
        align-items: center;

        .o-c,
        .i-p {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }

        .o-c {

            .op-box {
                position: relative;
                height: 180px;
                width: 180px;
                background-color: black;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;

                .img-container {
                    // display: flex;
                    // justify-content: center;
                    // align-items: center;
                    position: relative;

                    .back-img,
                    .refer-img {
                        display: block;
                        max-height: 180px;
                        max-width: 180px;
                        pointer-events: none;
                    }

                    .back-img {
                        filter: brightness(50%);
                    }

                    .refer-img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: -999;
                        pointer-events: none;
                        opacity: 0;
                        visibility: hidden;
                    }
                }

                // .mask {
                //     position: absolute;
                //     left: 0;
                //     top: 0;
                //     width: 100%;
                //     height: 100%;
                //     background-color: rgba(0, 0, 0, .5);
                // }

                .crop {
                    position: absolute;
                    left: 0;
                    top: 0;
                    box-sizing: border-box;
                    outline: 2px solid white;
                    cursor: move;

                    .crop-img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        overflow: hidden;

                        img {
                            position: absolute;
                            left: 0;
                            top: 0;
                            display: block;
                            max-height: 180px;
                            max-width: 180px;
                            pointer-events: none;
                        }
                    }

                    .corner {
                        position: absolute;
                        height: 10px;
                        width: 10px;
                        box-sizing: border-box;
                        opacity: 0;
                    }

                    .lt {
                        left: -5px;
                        top: -5px;
                        cursor: nw-resize;
                    }

                    .rt {
                        right: -5px;
                        top: -5px;
                        cursor: ne-resize;
                    }

                    .lb {
                        left: -5px;
                        bottom: -5px;
                        cursor: sw-resize;
                    }

                    .rb {
                        right: -5px;
                        bottom: -5px;
                        cursor: se-resize;
                    }
                }
            }

            .flie-choice {
                position: absolute;
                bottom: 0px;
                display: flex;
                align-items: center;
                cursor: pointer;

                &:hover {

                    svg,
                    .choice-text {
                        fill: #00a1d6;
                        color: #00a1d6;
                    }

                    svg {
                        transform: rotateZ(360deg);
                    }
                }

                svg,
                .choice-text {
                    fill: #9499a0;
                    color: #9499a0;
                    transition: .3s;
                }

                svg {
                    transform: rotateZ(0);
                }

                .choice-text {
                    font-size: 14px;
                    margin-left: 2px;
                }
            }
        }

        .choice-btn {
            i {
                font-size: 30px;
                margin-right: 4px;
            }
        }

        .preview {
            position: relative;
            height: 140px;
            width: 140px;
            border-radius: 50%;
            overflow: hidden;

            img {
                position: absolute;
                left: 0;
                top: 0;
                pointer-events: none;
            }
        }

        .p-text {
            margin-top: 10px;
            color: #9499a0;
            font-size: 13px;
        }

        .split-line {
            width: 2px;
            height: 150px;
            border-radius: 2px;
            background-color: #eee;
            margin: 0 40px;
        }
    }

    .upload-input {
        display: none;
    }

    .upload-tip {
        margin: 10px 0 30px 0;
        font-size: 12px;
        color: #9499a0;
        align-items: center;
    }
}
</style>