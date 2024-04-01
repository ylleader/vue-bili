<template>
    <div class="tabs" @click="tabClick">
        <div class="tabs-line" v-if="line"></div>
        <slot></slot>
        <div :class="sliderClass" :style="{ ...sliderStyle, backgroundColor: sliderColor }" ref=""></div>
    </div>
</template>

<script>
export default {
    name: 'Tabs',
    emits: ['tabClick'],
    props: {
        value: {
            default: ''
        },
        color: {
            type: String,
            default: '#9499A0'
        },
        activeColor: {
            type: String,
            default: ''
        },
        sliderColor: {
            type: String,
            default: '#00AEEC'
        },
        type: {
            type: String,
            default: ''
        },
        fontSize: {
            type: String,
            default: ''
        },
        line: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sliderStyle: {
                width: '',
                '--h': '',
                '--x': 0,
            },
            // activeName: this.value
        }
    },
    computed: {
        sliderClass() {
            return ['t-slider', this.type]
        },
        aColor() {
            if (this.type === 'line' && !this.activeColor) {
                return '#00AEEC'
            } else if (!this.type && !this.activeColor) {
                return 'white'
            } else {
                return this.activeColor
            }
        },
        activeName: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    watch: {
        $children() {
            this.$children.forEach((item, index) => {
                if (!item.hoverColor) {
                    item.hoverColor = this.sliderColor
                }
                item.color = this.color
                item.activeColor = this.aColor
                item.fontSize = this.fontSize


                if (!item.tName) {
                    item.tName = index
                }

                if (this.type === 'line') {
                    item.margin = '0 18px 0 0'
                } else {
                    item.padding = '8px 22px'
                }

                if (item.tName == this.activeName) {
                    item.active = true
                    this.$nextTick(() => {
                        this.initSlider(item.$el)
                    })
                }
            })
            if (!this.activeName) {
                this.$nextTick(() => {
                    this.activeName = this.$children[0].tName
                })
            }
        },
        activeName() {            
            this.$children.forEach((item, index) => {
                if (item.tName == this.activeName) {
                    item.active = true
                    this.initSlider(item.$el)
                } else {
                    item.active = false
                }
            })
            // this.$emit('input', this.activeName)
        }
    },
    methods: {
        initSlider(el) {
            this.sliderStyle.width = el.offsetWidth + 'px'
            this.sliderStyle['--h'] = el.offsetHeight + 'px'

            this.sliderStyle['--x'] = el.offsetLeft + 'px'
        },
        tabClick(e) {
            this.$children.forEach((item, index) => {
                if (item.$el.contains(e.target)) {
                    this.activeName = item.tName
                    this.$emit('tabClick', item.tName, item)
                }
            })
        }
    },
    mounted() {
        this.$children.forEach((item, index) => {

            if (!item.hoverColor) {
                item.hoverColor = this.sliderColor
            }
            item.color = this.color
            item.activeColor = this.aColor
            item.fontSize = this.fontSize

            if (!item.tName) {
                item.tName = index
            }

            if (this.type === 'line') {
                item.margin = '0 18px 0 0'
            } else {
                item.padding = '8px 22px'
            }

            if (item.tName == this.activeName) {
                item.active = true
                this.$nextTick(() => {
                    this.initSlider(item.$el)
                })
            }
        })
        if (!this.activeName) {
            this.$nextTick(() => {
                this.activeName = this.$children[0].tName
            })
        }

    },

}
</script>

<style lang="scss" scoped>
.tabs {
    // min-height: 50px;
    min-width: 100px;
    border-radius: 8px;
    // padding: 7px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    user-select: none;
    transition: 0.5s;
    position: relative;

    .t-slider {
        --h: 36px;
        --w: 36px;
        height: var(--h);
        border-radius: 8px;
        position: absolute;
        transition: all .5s cubic-bezier(.9, 0, .11, 1);
        background-color: #00AEEC;
        transform: translateX(var(--x));
    }

    .line {
        height: 2px;
        align-self: flex-end;
    }

    .tabs-line {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: auto;
        height: 2px;
        border-radius: 8px;
        background-color: #eee;
    }
}
</style>