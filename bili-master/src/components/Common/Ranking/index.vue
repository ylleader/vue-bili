<template>
    <div class="rank-container" :style="rankContainerStyle">
        <slot>

        </slot>
    </div>
</template>

<script>
export default {
    name: 'Ranking',
    props: {
        width: {
            type: String,
            default: '160px'
        },
        height: {
            type: String,
            default: '90px'
        }
    },
    data() {
        return {

        }
    },
    computed: {
        rankContainerStyle() {
            return {
                width: this.width,
                height: this.height
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.rank-container {
   
    border: 1px solid #F1F2F3;
    border-radius: 6px;
    min-width: 160px;
    min-height: 90px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
}
</style>