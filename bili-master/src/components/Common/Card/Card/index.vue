<template>
    <div class="card" :style="viedoCardStyle">
        <slot></slot>
        <div class="mask" v-if="mask">
            <slot name="mask"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Card',
    props: {
        width: {
            type: String,
            default: '320px',
        },
        height: {
            type: String,
            default: '180px',
        },
        border: String,
        borderRadius: String,
        backgroundImage: String,
        mask: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            titleStyle: {
                opacity: 1
            },
            src: '',
            v: false
        }
    },
    computed: {
        viedoCardStyle() {
            return {
                height: this.height,
                width: this.width,
                border: this.border,
                borderRadius: this.borderRadius,
                backgroundImage: this.backgroundImage
            }
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.card {
    border-radius: 6px;
    overflow: hidden;
    position: relative;

    background-image: url('@/assets/images/card/no-cover.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;

    &:hover .mask {
        opacity: 1;
    }

    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        // z-index: 1;
        background-color: rgba(0, 0, 0, .5);
        opacity: 0;
        color: white;
        // cursor: pointer;
        transition: .3s;
        pointer-events: none;

        * {
            pointer-events: auto;
        }
    }


}
</style>