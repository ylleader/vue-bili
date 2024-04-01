<template>
    <div class="ratio-box">
        <div class="img-box">
            <picture class="adv-img" img-lazy="lazy" img-style="web-home">
                <source v-for="(item, index) in srcs" :key="index" :srcset="item.src" :type="`image/${item.type}`">
                <!-- <source :srcset="1"
                    type="image/webp"> -->
                <img :src="srcs[0].src" alt="" loading="lazy" onload>
            </picture>
            <div class="adv-icon">
                <img src="@/assets/images/adv/eva.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Adv',
    props: {
        src: {
            type: [String, Array],
            default: require(`@/assets/images/adv/adv-00${Math.ceil(Math.random() * 14)}.webp`)
        }
    },
    computed: {
        srcs() {
            let srcArr = []
            let getType = (s) => {
                let type = ''
                if (s.indexOf('.') !== -1) {
                    let arr = s.split('.')
                    type = arr[arr.length - 1]
                }
                return type
            }
            if (typeof this.src != 'object') {
                srcArr.push({
                    src: this.src,
                    type: getType(this.src)
                })
            } else {
                this.src.forEach((item, index) => {
                    srcArr.push({
                        src: item,
                        type: getType(item)
                    })
                })
            }
            return srcArr
        }
    }
}
</script>

<style lang="scss" scoped>
.ratio-box {
    width: 100%;
    position: relative;
    padding-top: 8.275%;
}

.img-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #F1F2F3;
    background-clip: content-box;
    border-radius: 8px;
    cursor: pointer;

    .adv-img,
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }

    .adv-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 38px;
        height: 22px;
    }
}
</style>