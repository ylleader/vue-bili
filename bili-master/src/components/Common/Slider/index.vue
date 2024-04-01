<template>
    <div class="slider" :class="{ vertical, disabled }"
        :style="{ '--size': size, width: w, height: h, '--color': color, '--backcolor': backColor, ...sliderStyle }">
        <div class="slider-track" :style="{ '--bleft': bleft, '--btop': btop, width: w, height: h }"
            @mousedown="sliderdown" @touchstart="sliderdown" ref="slider">
            <div v-if="thumb" class="slider-thumb" :style="{ left: tleft, bottom: ttop }"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Slider',
    props: {
        width: String,
        height: {
            type: String,
            default: '6px'
        },
        vertical: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: Number,
            default: 0
        },
        thumb: {
            type: Boolean,
            default: true
        },
        color: String,
        backColor: String,
        disabled: Boolean,
        sliderStyle: {
            type: Object,
            default() {return {}}
        }
    },
    data() {
        return {
            bleft: '0%',
            tleft: '0%',
            btop: '',
            ttop: '',
            size: '',
            // value: 0,
            w: this.width,
            h: this.height,
        }
    },
    watch: {
        vertical: {
            immediate: true,
            handler(val) {
                if (val) {
                    !this.w && (this.w = '6px')
                    this.size = this.w
                } else {
                    this.size = this.height
                }

            }
        },
        value: {
            immediate: true,
            handler(val) {
                if (this.slidermousedown) return
                this.processChange(val * 100 / this.max + '%')
            }
        }
    },
    methods: {
        sliderdown(e) {
            e.stopPropagation()
            e.preventDefault()
            this.slidermousedown = true
            const srect = this.$refs.slider.getBoundingClientRect()

            const block = this.max / this.step
            let digit = (this.step + '').split('.')[1]?.length
            if (digit) {
                let d = digit
                digit = 1
                while (d--) {
                    digit *= 10
                }
            }

            let p, value
            const setValue = (e) => {
                e = (e.touches && e.touches[0]) || e
                if (this.vertical) p = (srect.bottom - e.clientY) / srect.height
                else p = (e.clientX - srect.left) / srect.width
                if (p < 0) p = 0
                else if (p > 1) p = 1
                this.processChange(p * 100 + '%')
                value = Math.floor(p * block) * this.step
                if (digit) value = Math.round(value * digit) / digit
                // this.value = value
                this.$emit('input', value)
            }

            setValue(e)

            const sm = (e) => {
                e.stopPropagation()
                if (this.slidermousedown) {
                    setValue(e)
                }
            }
            const su = (e) => {
                this.slidermousedown = false
                if (e.touches) {
                    window.removeEventListener('touchstart', sm)
                    window.removeEventListener('touchend', su)
                } else {
                    window.removeEventListener('mousemove', sm)
                    window.removeEventListener('mouseup', su)
                }
            }

            if (e.touches) {
                window.addEventListener('touchmove', sm)
                window.addEventListener('touchend', su)
            } else {
                window.addEventListener('mousemove', sm)
                window.addEventListener('mouseup', su)
            }

        },
        processChange(val) {
            if (this.vertical) {
                this.btop = val
                this.ttop = val
            } else {
                this.bleft = val
                this.tleft = val
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.slider {
    --size: 6px;
    --color: #00a1d6;
    --backcolor: #eee;
    --bleft: 0%;

    padding: 6px 0;

    .slider-track {
        position: relative;
        width: 100%;
        height: 6px;
        background-image: linear-gradient(to right, var(--color) 0%, var(--color) 50%, var(--backcolor) 50%, var(--backcolor) 100%);
        background-size: 200%;
        background-position-x: calc(100% - var(--bleft));
        border-radius: var(--size);
        cursor: pointer;

        .slider-thumb {
            position: absolute;
            left: 0;
            top: 0;
            height: calc(var(--size) * 2.2);
            width: calc(var(--size) * 2.2);
            transform: translate(-50%, -25%);
            background-color: var(--color);
            border-radius: 55%;
        }
    }

}

.vertical {
    padding: 0 6px;

    .slider-track {
        width: 6px;
        background-image: linear-gradient(to top, var(--color) 0%, var(--color) 50%, var(--backcolor) 50%, var(--backcolor) 100%);
        background-size: 100% 200%;
        background-position-y: calc(var(--btop));

        .slider-thumb {
            top: auto;
            bottom: 0;
            transform: translate(calc((var(--size) * 2.2 - var(--size)) / -2), 50%);
        }
    }
}

.disabled {
    pointer-events: none;
}
</style>