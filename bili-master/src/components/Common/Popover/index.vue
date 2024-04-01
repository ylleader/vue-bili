<template>
    <div class="popover-container" @touchstart="hoverShow" @touchend="hoverHide" @mouseenter="hoverShow"
        @mouseleave="hoverHide" @click="clickShow" ref="pc">
        <div class="reference" ref="reference">
            <slot name="reference"></slot>
        </div>
        <transition :name="mode">
            <div class="popover" :style="{ ...popStyle, ...pstyle, ...popPosition, position }" v-show="vsb" ref="pop"
                @click.stop="clickClosePopover" @mouseenter="hoverShow" @mouseleave="hoverHide">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'Popover',
    props: {
        trigger: {
            type: String,
            default: 'hover'
        },
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        },
        backgroundColor: {
            type: String,
            default: '#fff'
        },
        borderRadius: {
            type: String,
            default: '6px'
        },
        top: {
            type: Number,
            default: 0
        },
        left: {
            type: Number,
            default: 0
        },
        bottom: {
            type: String,
            default: ''
        },
        right: {
            type: String,
            default: ''
        },
        duration: {
            type: String,
            default: '0.3s'
        },
        delay: {
            type: Number,
            default: 150
        },
        mode: {
            type: String,
            default: 'pop'
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        clickClose: {
            type: Boolean,
            default: false
        },
        popoverHover: {
            type: Boolean,
            default: true
        },
        pstyle: {
            type: Object,
            default() {
                return {}
            }
        },
        pvisible: {},
        append: {
            type: Boolean,
            default: true
        },
    },
    emits: ['show', 'hide'],
    data() {
        return {
            visible: false,
            popPosition: {},
            position: '',
            tx: 0,
            ty: 0
        }
    },
    computed: {
        popStyle() {
            return {
                transitionDuration: this.duration,
                backgroundColor: this.backgroundColor,
                width: this.width,
                height: this.height,
                borderRadius: this.borderRadius,
                zIndex: this.zIndex,
                pointerEvents: this.popoverHover ? '' : 'none'
            }
        },
        vsb() {
            return this.pvisible === undefined ? this.visible : this.pvisible
        }
    },
    watch: {
        visible(val) {
            if (val) {
                setImmediate(() => {
                    if (this.append) {
                        document.body.appendChild(this.$refs.pop)
                    } else {
                        this.$refs.pc.appendChild(this.$refs.pop)
                    }
                    this.positionInit()
                })
                if (!this.getPosition()) window.addEventListener('scroll', this.positionInit)
                window.addEventListener('resize', this.positionInit)
                setImmediate(() => {
                    this.$emit('show')
                })

            } else {
                // setImmediate(() => {
                this.$emit('hide')
                // })
                window.removeEventListener('scroll', this.positionInit)
                window.removeEventListener('resize', this.positionInit)
            }
        },
        left() {
            this.positionInit()
        }
    },
    methods: {
        positionInit() {

            let l, t, r, b, bcr, pbcr
            let st = 0, sl = 0
            if (!this.position) {
                st = document.documentElement.scrollTop || document.body.scrollTop
                sl = document.documentElement.scrollLeft || document.body.scrollLeft
            }


            if (this.$refs.reference && this.$refs.reference.children[0]) {
                bcr = this.$refs.reference.children[0].getBoundingClientRect()
            } else {
                bcr = this.$refs.reference.getBoundingClientRect()
            }
            if (this.$refs.pop && this.$refs.pop.children[0]) {
                pbcr = this.$refs.pop.children[0].getBoundingClientRect()
            } else {
                pbcr = this.$refs.pop.getBoundingClientRect()
            }


            if (this.placement === 'bottom') {
                t = bcr.bottom + st + this.top
                l = bcr.left + sl + bcr.width / 2 - pbcr.width / 2 + this.left
            } else if (this.placement === 'top') {
                t = bcr.top + st - pbcr.height + this.top
                l = bcr.left + sl + bcr.width / 2 - pbcr.width / 2 + this.left
            } else if (this.placement === 'left') {
                t = bcr.top + st + bcr.height / 2 - pbcr.height / 2 + this.top
                l = brc.left + sl - pbcr.width + this.left
            } else if (this.placement === 'right') {
                t = bcr.top + st + bcr.height / 2 - pbcr.height / 2 + this.top
                l = bcr.right + sl + this.left
            } else if (this.placement === 'bottom-end') {
                t = bcr.bottom + st + this.top
                l = bcr.right + sl - pbcr.width + this.left
            } else if (this.placement === 'bottom-start') {
                l = bcr.left + sl + this.left
                t = bcr.bottom + st + this.top
            } else if (this.placement === 'top-start') {
                t = bcr.top + st - pbcr.height + this.top
                l = bcr.left + sl + this.left
            } else if (this.placement === 'top-end') {
                t = bcr.top + st - pbcr.height + this.top
                l = bcr.right + sl - pbcr.width + this.left
            }

            this.popPosition = {
                left: l ? l + 'px' : '',
                top: t ? t + 'px' : '',
                bottom: b ? b + 'px' : '',
                right: r ? r + 'px' : '',
            }

        },
        hoverShow() {
            if (this.trigger === 'hover') {
                this.timeout && clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.visible = true
                }, this.delay);
            }
        },
        hoverHide() {
            if (this.trigger === 'hover') {
                this.timeout && clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.visible = false
                }, this.delay);
            }
        },
        clickShow() {
            if (this.trigger === 'click') {

                this.visible = !this.visible

                if (this.visible === true) {
                    setImmediate(() => {
                        window.addEventListener('click', this.clickHide)
                    })
                } else {
                    window.removeEventListener('click', this.clickHide)
                }

            }
        },
        clickHide() {
            this.visible = false
            window.removeEventListener('click', this.clickHide)
        },
        clickClosePopover() {
            if (this.clickClose) {
                this.visible = false
            }
        },
        getPosition() {
            const getCurrentStyle = (el) => {
                return (window.getComputedStyle && window.getComputedStyle(el)) || el.currentStyle
            }
            this.position = ''
            let el = this.$refs.reference
            while (el) {
                const currentStyle = getCurrentStyle(el)
                if (currentStyle.position === 'fixed') return this.position = 'fixed'
                el = el.offsetParent
            }
            return this.position
        }
    },
    mounted() {
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.positionInit)
        window.removeEventListener('resize', this.positionInit)
        this.append && this.$refs.pop.remove()
    }
}
</script>

<style lang="scss" scoped>
.popover-container {
    // position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // overflow: hidden;
}

.reference {
    width: 100%;
}


.popover {
    position: absolute;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0 8px rgba($color: #000000, $alpha: .2);
    transition-duration: .3s;
    transition-property: transform, opacity;
    z-index: 999;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: translateY(-5%);
}

.pop-enter-to,
.pop-leave {
    opacity: 1;
    transform: translateY(0);
}


.to-top-enter,
.to-top-leave-to {
    opacity: 0;
    transform: translateY(5%);
}

.to-top-enter-to,
.to-top-leave {
    opacity: 1;
    transform: translateY(0);
}



.tran-enter,
.tran-leave-to {
    opacity: 0;
}

.tran-enter-to,
.tran-leave {
    opacity: 1;
}
</style>