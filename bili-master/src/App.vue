<template>
  <div id="app">
    <!-- <keep-alive :include="$store.state.cache.caches"> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>

export default {
  name: "App",
  computed: {
    key() {
      return this.$route.path + Math.random()
    }
  },
  mounted() {
    console.log(this);
    window.addEventListener("storage", (e) => {
      if (e.key !== 'login-state') return
      if (e.newValue === '0') {
        this.$store.dispatch('user/deleteInfo')
      } else if (e.newValue === '1') {
        this.$store.dispatch('user/getUserInfo')
      }
    })
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  /* height: 6000px; */
}

/* .text-enter,
.text-leave-to {
  opacity: 0;
}

.text-enter-to,
.text-leave {
  opacity: 1;
}

.text-enter-active{
  transition: .6s;
} */
</style>
