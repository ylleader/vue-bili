<template>
  <div class="drawer">
    <transition name="mask">
      <div class="mask" @click="drawerClose" @wheel="maskWheel" v-if="visible && mask"></div>
    </transition>
    <transition :name="`drawer-${direction}`">
      <div class="d" :style="dStyle" v-if="visible">
        <div class="d-head">
          <div class="close" @click="drawerClose" v-if="close">
            <i class="iconfont icon-guanbi"></i>
          </div>
          <div class="title" :style="{ color: titleColor }" v-if="title">
            {{ title }}
          </div>
        </div>
        <div class="d-main" ref="drawer" @wheel="drawerWheel">
          <slot>
          </slot>
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: true
    },
    lock: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: ''
    },
    beforeClose: Function

  },
  computed: {
    dStyle() {
      let width, height, left, right, top, bottom

      if (this.direction === 'rtl' || this.direction === 'ltr') {
        width = this.size
        height = '100%'
      } else {
        width = '100%'
        height = this.size
      }
      if (this.direction === 'rtl') {
        right = 0
        top = 0
      } else if (this.direction === 'ltr') {
        left = 0
        top = 0
      }
      else if (this.direction === 'ttb') {
        left = 0
        top = 0
      } else if (this.direction === 'btt') {
        left = 0
        bottom = 0
      }
      return {
        left, right, top, bottom, width, height,
        backgroundColor: this.backgroundColor
      }

    }
  },
  methods: {
    maskClick() {
      this.$emit('update:visible', false)
    },
    maskWheel(e) {
      if (!this.lock) {
        e.preventDefault()
        return false
      }
    },
    drawerWheel(e) {
      let top = this.$refs.drawer.scrollTop
      let height = this.$refs.drawer.scrollHeight - this.$refs.drawer.offsetHeight

      if (e.wheelDelta) {
        if (e.wheelDelta > 0 && top <= 0) {
          e.preventDefault()
          return false
        } else if (e.wheelDelta < 0 && top >= height - 2) {
          e.preventDefault()
          return false
        }
      } else if (e.detail) {
        if (e.detail > 0 && top >= height - 2) {
          e.preventDefault()
          return false
        } else if (e.detail < 0 && top <= 0) {
          e.preventDefault()
          return false
        }
      }
    },
    drawerClose() {
      if (this.beforeClose) {
        new Promise((resolve, reject) => {
          this.beforeClose(resolve)
        }).then(res => {
          this.$emit('update:visible', false)
        })
      } else {
        this.$emit('update:visible', false)
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
    transition: .3s;
    pointer-events: auto;
  }

  .mask-enter,
  .mask-leave-to {
    opacity: 0;
  }

  .mask-enter-to,
  .mask-leave {
    opacity: 1;
  }

  .d {
    position: absolute;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 0 3px rgba(0, 0, 0, .2);
    transition: .3s;
    pointer-events: auto;
    display: flex;
    flex-direction: column;


    .d-head {
      // background-color: white;
      padding: 20px 20px 10px 20px;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;

      .title {
        font-size: 18px;
      }

      .close {
        font-weight: bold;
        color: gray;
        cursor: pointer;

        i {
          font-size: 18px;
        }
      }
    }

    .d-main {
      // height: 100%;
      // width: 100%;
      flex: 1;
      box-sizing: border-box;
      overflow-y: hidden;
      padding: 0 20px 20px 20px;

      &:hover {
        overflow-y: auto;
        overflow-y: overlay;
      }

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #c9caca;
        border-radius: 4px;
      }

    }
  }

  .drawer-rtl-enter,
  .drawer-rtl-leave-to {
    transform: translateX(100%);
  }

  .drawer-rtl-enter-to,
  .drawer-rtl-leave {
    transform: translateX(0);
  }

  .drawer-ltr-enter,
  .drawer-ltr-leave-to {
    transform: translateX(-100%);
  }

  .drawer-ltr-enter-to,
  .drawer-ltr-leave {
    transform: translateX(0);
  }

  .drawer-ttb-enter,
  .drawer-ttb-leave-to {
    transform: translateY(-100%);
  }

  .drawer-ttb-enter-to,
  .drawer-ttb-leave {
    transform: translateY(0);
  }

  .drawer-btt-enter,
  .drawer-btt-leave-to {
    transform: translateY(100%);
  }

  .drawer-btt-enter-to,
  .drawer-btt-leave {
    transform: translateY(0);
  }


}
</style>