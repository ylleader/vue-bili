<template>
  <transition name="roc">
    <div class="rocket" :style="{ ...rocketStyle, '--y': y }" @click="backToTop" ref="rocket" v-if="visible">
      <div :class="{ 'r-i': true, anima }">
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Rocket',
  props: {
    position: String,
    left: String,
    right: {
      type: String,
      default: '20px'
    },
    top: String,
    bottom: {
      type: String,
      default: '80px'
    },
    scrollTop: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      y: '',
      anima: false,
      visible: false
    }
  },
  computed: {
    rocketStyle() {
      return {
        position: this.position,
        left: this.left,
        right: this.right,
        top: this.top,
        bottom: this.bottom,
      }
    }
  },
  methods: {
    backToTop() {
      this.anima = true
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        this.y = ((this.$refs.rocket.offsetTop + 100) * -1) + 'px'
        this.rocketing = true
        setTimeout(() => {
          this.y = 0
          this.anima = false
          this.rocketing = false
          this.visible = false
        }, 800);
      }, 600);
    },
    listenerInit() {
      this.scrollHandle = () => {
        const top = document.documentElement.scrollTop
        if (top >= this.scrollTop) {
          this.visible = true
        } else if (top < this.scrollTop && !this.rocketing) {
          this.visible = false
        }
      }
      window.addEventListener('scroll', this.scrollHandle)
    }
  },
  mounted() {
    this.listenerInit()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandle)
  }
}
</script>

<style lang="scss" scoped>
.rocket {
  --y: 0;
  position: fixed;
  width: 62px;
  height: 85px;
  cursor: pointer;
  transition: .8s;
  transform: translateY(var(--y));

  .r-i {
    height: 100%;
    background-image: url('@/assets/images/backRocket/space-to-top.png');
    background-position: -40px -44px;
    background-repeat: no-repeat;
  }

  .anima {
    animation: space .6s steps(6) infinite;
  }

  @keyframes space {
    from {
      background-position: -40px -44px;
    }

    to {
      background-position: -898px -44px;
    }
  }
}

.roc-enter,
.roc-leave-to {
  opacity: 0;
}

.roc-enter-to,
.roc-leave {
  opacity: 1;
}

.roc-enter-active,.roc-leave-active {
  transition: .2s;
}
</style>
