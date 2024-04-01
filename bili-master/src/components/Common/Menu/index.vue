<template>
    <!-- <div class="menu-container" v-if="visible"> -->
    <!-- <transition name="menu-mask">
            <div class="menu-mask" @click="closeMenu" v-if="menuMBShow"></div>
        </transition> -->
    <transition name="menu-box">
        <div class="menu-container" @mousewheel="preventWindowScroll" ref="menuBox" v-show="visible">
            <div class="menu-header">
                <i class="iconfont icon-caidanguanli"></i>
                <span>分区</span>
            </div>
            <div class="menu-main" @click="activeChange" ref="menuMain">
                <slot>
                </slot>
            </div>
        </div>
    </transition>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'Menu',
    props: {
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
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        activeColor: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        activeIndex: {}
    },
    data() {
        return {
            menuStyle: {
                width: this.width,
                height: this.height,
                backgroundColor: this.backgroundColor,
                color: this.color
            },
            menuMBShow: false
        }
    },
    watch: {
        activeIndex(val) {
            this.$refs.menuMain.childNodes.forEach(element => {
                if (element.getAttribute('menuid') === val) {
                    element.style.backgroundColor = '#E3E5E7'
                } else {
                    element.style.backgroundColor = ''
                }
            });
        }
    },
    methods: {
        preventWindowScroll(event) {
            let top = this.$refs.menuBox.scrollTop
            let height = this.$refs.menuBox.scrollHeight - this.$refs.menuBox.offsetHeight

            if (event.wheelDelta) {
                if (event.wheelDelta > 0 && top <= 0) {
                    event.preventDefault()
                    return false
                } else if (event.wheelDelta < 0 && top >= height-2) {
                    event.preventDefault()
                    return false
                }
            } else if (event.detail) {
                if (event.detail > 0 && top >= height-2) {
                    event.preventDefault()
                    return false
                } else if (event.detail < 0 && top <= 0) {
                    event.preventDefault()
                    return false
                }
            }
        },
        activeChange(event) {
            // if (event.target.getAttribute('mu')) {
            //     this.$refs.menuMain.childNodes.forEach(element => {
            //         if (element === event.target) {
            //             event.target.style.backgroundColor = '#E3E5E7'
            //         } else {
            //             element.style.backgroundColor = ''
            //         }
            //     });
            // }
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.menu-container {
    // position: fixed;
    // right: 0;
    // top: 0;
    // width: 100%;
    // height: 100%;
    // z-index: 100;

    // .menu-mask {
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     width: 100%;
    //     height: 100%;
    //     background-color: rgba(0, 0, 0, .4);
    //     transition: .3s;
    // }

    // .menu-box {
    position: fixed;
    top: 0;
    right: 0;
    width: 124px;
    height: 100%;
    z-index: 100;
    background-color: white;
    transition: .3s;



    &::-webkit-scrollbar {
        width: 0 !important;
        display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    overflow-y: auto;

    .menu-header {
        color: #18191c;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        padding: 13px 0;
        vertical-align: bottom;

        i {
            font-size: 21px;
            margin-right: 4px;
        }
    }

    .menu-main {
        padding: 14px;
    }

    // }
}

.menu-box-enter,
.menu-box-leave-to {
    transform: translateX(100%);
}

.menu-box-enter-to,
.menu-box-leave {
    transform: translateX(0);
}

.menu-mask-enter,
.menu-mask-leave-to {
    opacity: 0;
}

.menu-mask-enter-to,
.menu-mask-leave {
    opacity: 1;
}
</style>