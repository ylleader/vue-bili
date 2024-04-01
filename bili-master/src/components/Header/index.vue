<template>
  <div>
    <!-- <BannerDayAndNight>
    </BannerDayAndNight> -->
    <!-- <BannerWinter>
      <MinHeader></MinHeader>
    </BannerWinter> -->
    <!-- <BannerPaperCrane>
      <MinHeader color="rgb(100,100,100)"></MinHeader>
    </BannerPaperCrane> -->
    <!-- <BannerCloud>
      <MinHeader hoverColor="#02b5da"></MinHeader>
    </BannerCloud> -->
    <BannerEyes>
      <MinHeader hoverColor="black"></MinHeader>
    </BannerEyes>
  </div>
</template>

<script>

import BannerWinter from "./Banner/BannerWinter";
import MinHeader from "@/components/Header/MinHeader";
import BannerDayAndNight from '@/components/Header/Banner/BannerDayAndNight'
import BannerPaperCrane from "./Banner/BannerPaperCrane";
import BannerCloud from "./Banner/BannerCloud";
import BannerEyes from "./Banner/BannerEyes";

export default {
  name: "Header",
  components: {
    BannerWinter,
    MinHeader,
    BannerDayAndNight,
    BannerPaperCrane,
    BannerCloud,
    BannerEyes
  },
  template: '<h1>111</h1>'
};
</script>

<style>

</style>
