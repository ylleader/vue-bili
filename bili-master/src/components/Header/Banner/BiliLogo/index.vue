<template>
  <a class="logo-container" :style="logoBoxStyle" href="/">
    <img :src="imgSrc" alt="biliLogo" />
  </a>
</template>

<script>
export default {
  name: "BiliLogo",
  props: {
    imgSrc: {
        type: String,
        default: require('@/assets/images/header/logo/logo-bili-01.webp')
    },
    top: {
      type: String,
      default: ''
    },
    left: {
      type: String,
      default: ''
    },
    bottom: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: ''
    }
  },
  computed: {
    logoBoxStyle() {
      return {
        top: this.top,
        bottom: this.bottom,
        left: this.left,
        right: this.right
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-container {
  width: 167px;
  height: 78px;
  position: absolute;
  bottom: 10px;
  left: 80px;
  top: auto;
  right: auto;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>>
   
