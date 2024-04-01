<template>
  <div class="banner">
    <div class="banner-container">
      <div class="eyes">
        <div class="eyeball"></div>
      </div>
      <div class="eyes" style="margin-left: 20px">
        <div class="eyeball"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <BiliLogo :imgSrc="require('@/assets/images/header/logo/logo-bili-black.png')"></BiliLogo>
    <slot>
      <MinHeader hoverColor="black"></MinHeader>
    </slot>
  </div>
</template>

<script>
import BiliLogo from "@/components/Header/Banner/BiliLogo";
import MinHeader from "@/components/Header/MinHeader";

export default {
  name: "BannerEyes",
  components: {
    BiliLogo,
    MinHeader,
  },
  methods: {
    eyesroll() {
      let eyes = document.querySelectorAll(".eyes");
      let originX1,
        originY1,
        originX2,
        originY2,
        currentX,
        currentY,
        sideX1,
        sideY1,
        sideX2,
        sideY2,
        hypotenuse1,
        hypotenuse2,
        timer;
      let eyeball = document.querySelectorAll(".eyeball");
      this.eyesrollMouseEventFun = (event) => {
        originX1 = eyes[0].offsetLeft + eyes[0].offsetWidth / 2;
        originY1 = eyes[0].offsetTop + eyes[0].offsetHeight / 2;
        originX2 = eyes[1].offsetLeft + eyes[1].offsetWidth / 2;
        originY2 = eyes[1].offsetTop + eyes[1].offsetHeight / 2;
        currentX = event.pageX;
        currentY = event.pageY;

        sideX1 = currentX - originX1;
        sideY1 = currentY - originY1;
        hypotenuse1 = Math.sqrt(sideX1 * sideX1 + sideY1 * sideY1);

        sideX2 = currentX - originX2;
        sideY2 = currentY - originY2;
        hypotenuse2 = Math.sqrt(sideX2 * sideX2 + sideY2 * sideY2);

        let deg1 = (Math.asin(sideX1 / hypotenuse1) * 180) / Math.PI;
        let deg2 = (Math.asin(sideX2 / hypotenuse2) * 180) / Math.PI;

        if (deg1 > 0 && currentY > originY1) {
          deg1 = 90 + (90 - deg1);
        } else if (deg1 < 0 && currentY > originY1) {
          deg1 = -90 - (90 + deg1);
        }

        if (deg2 > 0 && currentY > originY2) {
          deg2 = 90 + (90 - deg2);
        } else if (deg2 < 0 && currentY > originY2) {
          deg2 = -90 - (90 + deg2);
        }

        eyeball[0].style.setProperty("--top", "1%");
        eyeball[1].style.setProperty("--top", "1%");

        if (deg1 != 0) eyes[0].style.setProperty("--deg", deg1 + "deg");
        if (deg2 != 0) eyes[1].style.setProperty("--deg", deg2 + "deg");

        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          eyeball[0].style.setProperty("--top", "50%");
          eyeball[1].style.setProperty("--top", "50%");
          timer = null;
        }, 2000);
      };
      window.addEventListener("mousemove", this.eyesrollMouseEventFun);
    },
  },
  mounted() {
    this.eyesroll();
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.eyesrollMouseEventFun);
  },
};
</script>

<style scoped>
.banner {
  position: relative;
}

.banner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  background-color: rgb(255, 225, 64);
}

.eyes {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: white;
  background-image: radial-gradient();
  border: 6px solid black;
  text-align: center;
  position: relative;
  /* z-index: 10; */

  display: flex;
  align-items: center;
  justify-content: center;

  --deg: 0deg;

  transform: rotateZ(var(--deg));
}

.eyes .eyeball {
  --top: 50%;

  content: "";
  display: block;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: var(--top);
  left: 50%;
  transform: translateX(-50%) translateY(calc(-1 * var(--top)));
  transition: 0.3s;
}

.mouth {
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-bottom-color: black;
  margin-top: 80px;
  transform: rotateX(0);
  transform-origin: 0% 90%;
  transition: 0.8s;
}

.eyes:hover~.mouth {
  transform: rotateX(-180deg);
}

.dai {
  position: absolute;
  height: 20px;
  width: 28%;
  background-color: black;
}
</style>