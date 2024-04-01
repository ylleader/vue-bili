<template>
  <div class="bg" :style="styleOptions">
    <div class="moon">
      <div class="moonZ" @click="moonSet">
        <div class="cloud" :style="{ '--size': '40px' }"></div>
        <div class="cloud" :style="{ '--top': '70%', '--duration': '28s' }"></div>
      </div>
    </div>
    <div class="sun" @click="sunSet">
      <div v-for="index in 9" :key="index" class="ray" :style="{ '--ray-rotate': index * 40 + 'deg' }"></div>
    </div>
    <div class="sea"></div>
    <transition name="logo">
      <BiliLogo :imgSrc="require('@/assets/images/header/logo/logo-bili-orange.png')" style="transition: 1s"
        v-show="state=='sun'"></BiliLogo>
    </transition>
    <transition name="logo">
      <BiliLogo :imgSrc="require('@/assets/images/header/logo/logo-bili-cyan.png')" style="transition: 1s"
        v-show="state=='moon'"></BiliLogo>
    </transition>
    <slot>
      <MinHeader :hoverColor="minHeader.hoverColor"></MinHeader>
    </slot>
  </div>
</template>

<script>
import BiliLogo from "@/components/Header/Banner/BiliLogo";
import MinHeader from "@/components/Header/MinHeader";
export default {
  name: "BannerDayAndNight",
  components: {
    BiliLogo,
    MinHeader,
  },
  data() {
    return {
      bgColor: "#ffeea2",
      sunTop: "55%",
      moonTop: "130%",
      // clip: '0%',
      minHeader: {
        hoverColor: "orange",
      },
      state: 'sun'
    };
  },
  computed: {
    styleOptions() {
      return {
        "--bgColor": this.bgColor,
        "--sunTop": this.sunTop,
        "--moonTop": this.moonTop,
        // "--clip": this.clip
      };
    },
  },
  methods: {
    sunSet() {
      this.bgColor = "#040720";
      this.sunTop = "150%";
      this.moonTop = "55%";
      this.minHeader.hoverColor = "cyan";
      this.state = 'moon'
      this.saveSetting(
        this.bgColor,
        this.sunTop,
        this.moonTop,
        this.minHeader.hoverColor,
        this.state
      );
    },
    moonSet() {
      this.bgColor = "#ffeea2";
      this.sunTop = "55%";
      this.moonTop = "150%";
      this.minHeader.hoverColor = "orange";
      this.state = 'sun'
      this.saveSetting(
        this.bgColor,
        this.sunTop,
        this.moonTop,
        this.minHeader.hoverColor,
        this.state
      );
    },
    bannerInit() {
      let bannerSetting = localStorage.getItem("bannerSetting");
      if (bannerSetting) {
        bannerSetting = JSON.parse(bannerSetting);
        this.bgColor = bannerSetting.bgColor;
        this.sunTop = bannerSetting.sunTop;
        this.moonTop = bannerSetting.moonTop;
        this.minHeader.hoverColor = bannerSetting.minHeaderHoverColor;
        this.state = bannerSetting.state
      }
    },
    saveSetting(bgColor, sunTop, moonTop, minHeaderHoverColor, state) {
      let bannerSetting = {
        bgColor,
        sunTop,
        moonTop,
        minHeaderHoverColor,
        state
      };
      localStorage.setItem("bannerSetting", JSON.stringify(bannerSetting));
    },
  },
  created() {
    this.bannerInit();
  },
  mounted() { },
};
</script>

<style scoped>
.bg {
  --bgColor: #ffeea2;
  --sunTop: 50%;
  --moonTop: 120%;
  --clip: 0%;

  position: relative;
  width: 100%;
  height: 180px;
  background-color: var(--bgColor);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: 2s;

  /* --clip-top: 0; */
  /* clip-path: inset(var(--clip-top) 0 0 0); */
  /* border: 1px solid red; */

  /* clip-path: circle(6%); */
}

/* .bg .bg2 {
  width: 200%;
  height: 200%;
  position: absolute;
  left: -20px;
  bottom: -20px;
  background-color: #ffeea2;
  clip-path: circle(var(--clip) at left bottom);
  transition: 1s;
} */

.bg .sun {
  position: absolute;
  top: var(--sunTop);
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: orange;
  cursor: pointer;
  transition: 1.5s;

  display: flex;
  align-items: center;
  justify-content: center;

  animation: sunrun 20s linear infinite;
}


@keyframes sunrun {
  from {
    transform: translateY(-50%) rotate(0deg);
  }

  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

.bg .sun .ray {
  position: absolute;
  width: 170%;
  height: 170%;
  /* border: 2px orange dashed; */
  border-radius: 50%;
  --ray-rotate: 0deg;
  transform: rotateZ(var(--ray-rotate));
}

.bg .sun .ray::after {
  content: "";
  display: block;
  margin: 0 auto;
  width: 1%;
  height: 15%;
  background-color: orange;
}

.bg .moon {
  position: absolute;
  top: var(--moonTop);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 30px 26px 0 cyan;
  transform: translate(-26.67%, -80%);
  transition: 1.5s;
}

.bg .moon .moonZ {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translate(30px, 26px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
}

.cloud {
  --size: 50px;
  --top: 20%;
  --left: -60%;
  --duration: 13s;
  width: var(--size);
  height: calc(0.36 * var(--size));
  background-color: white;
  border-radius: calc(0.18 * var(--size));
  position: absolute;
  top: var(--top);
  left: var(--left);
  animation: cloudrun var(--duration) linear infinite;
}

@keyframes cloudrun {
  0% {
    left: -120%;
    opacity: 0;
  }

  20% {
    left: -120%;
    opacity: 0;
  }

  30% {
    opacity: 0.95;
  }

  90% {
    opacity: 0.95;
  }

  100% {
    left: 210%;
    opacity: 0;
  }
}

.cloud:after,
.cloud:before {
  content: "";
  position: absolute;
  background-color: white;
  /* z-index: -1; */
}

.cloud:after {
  width: 30.3%;
  height: 83.33%;
  top: -41.67%;
  left: 15.15%;
  border-radius: 50%;
}

.cloud:before {
  width: 54.54%;
  height: 150%;
  top: -75%;
  right: 15.15%;
  border-radius: 50%;
}

.sea {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  /* z-index: 1; */
}


.logo-enter, .logo-leave-to {
  opacity: 0;
}

.logo-enter-to,
.logo-leave {
  opacity: 1;
}
</style>