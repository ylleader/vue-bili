<template>
    <BannerVideo :src="$route.meta.vsrc"></BannerVideo>
</template>

<script>
import BannerVideo from '@/components/Header/Banner/BannerVideo'

export default {
    name: 'PapercranelHeader',
    components: {
        BannerVideo
    }
}
</script>

<style>

</style>