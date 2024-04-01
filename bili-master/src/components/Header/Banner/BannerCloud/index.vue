<template>
  <div ref="bannerCloud" class="banner-container">
    <BiliLogo :imgSrc="require('@/assets/images/header/logo/logo-bili-01.webp')"></BiliLogo>
    <slot>
      <MinHeader hoverColor="#02b5da"></MinHeader>
    </slot>
  </div>
</template>

<script>
import * as THREE from "three"
import CLOUDS from "vanta/src/vanta.clouds"
import MinHeader from "@/components/Header/MinHeader";
import BiliLogo from '@/components/Header/Banner/BiliLogo'
export default {
    name: 'BannerCloud',
    components: {
    MinHeader,
    BiliLogo
},
    mounted(){
        this.CLOUDS = CLOUDS({
          el: this.$refs.bannerCloud,
          THREE: THREE,   
        });
    },
    beforeDestroy(){
      if(this.CLOUDS){
        this.CLOUDS.destroy()
      }
    }
}
</script>

<style scoped>
    .banner-container {
        width: 100%;
        height: 200px;
    }
</style>