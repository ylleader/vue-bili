<template>
    <div class="tab-panel" :style="{ padding, margin, fontSize }">
        <slot></slot>
        <span :class="{ 'p-lable': true, active }"
            :style="{ '--color': color, '--active-color': activeColor, '--hover-color': hoverColor }">
            {{ lable }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'TabPanel',
    props: {
        lable: '',
        name: '',
    },
    data() {
        return {
            color: undefined,
            activeColor: undefined,
            hoverColor: undefined,
            active: false,
            tName: this.name,
            padding: '',
            margin: '',
            fontSize: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-panel {
    // height: 36px;
    padding: 8px 0;
    box-sizing: border-box;
    // padding: 0 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    z-index: 1;
    cursor: pointer;


    .p-lable {
        --color: #9499A0;

        color: var(--color);
        letter-spacing: 1px;
        transition-duration: .2s;
        transition-delay: .25s;
        transition-property: color;

    }

    .active {
        color: var(--active-color);
    }

    &:hover {
        .p-lable {
            color: var(--hover-color);
        }

        .active {
            color: var(--active-color);
        }
    }
}
</style>