<template>
    <div mu="mu" class="menu-item" :style="menuItemStyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        color: {
            type: String,
            default: ''
        },
        backgroundColor: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            menuItemStyle: {
                color: this.color,
                backgroundColor: this.backgroundColor
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.menu-item {
    position: relative;
    width: 100%;
    margin: 4px 0;
    height: 36px;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    line-height: 36px;
    transition: .3s;
    user-select: none;
    color: #18191c;
    cursor: pointer;

    &:hover {
        background-color: #E3E5E7;
    }
}
</style>