<template>

  <div ref="bannerPaperCtane" class="banner-container">
    <BiliLogo :imgSrc="require('@/assets/images/header/logo/logo-bili-pink.png')"></BiliLogo>
    <slot>
      <MinHeader color="#18191c" boxShadowOpa="0.1"></MinHeader>
    </slot>
  </div>

</template>

<script>
import * as THREE from "three";
import BIRDS from "vanta/src/vanta.birds";
import MinHeader from "@/components/Header/MinHeader";
import BiliLogo from "@/components/Header/Banner/BiliLogo";
export default {
  name: "BannerPaperCtane",
  components: {
    MinHeader,
    BiliLogo,
  },
  mounted() {
    this.BIRDS = BIRDS({
      el: this.$refs.bannerPaperCtane,
      THREE: THREE,
      backgroundColor: "white",
      scale: 2.5,
      separation: 50.0,
      cohesion: 50.0,
    });
  },
  beforeDestroy() {
    if (this.BIRDS) {
      this.BIRDS.destroy();
    }
  },
};
</script>

<style scoped>
.banner-container {
  width: 100%;
  height: 200px;
  position: relative;
}
</style>