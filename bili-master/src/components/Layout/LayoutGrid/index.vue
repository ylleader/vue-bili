<template>
    <div class="layout-grid">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'LayoutGrid'
}
</script>

<style lang="scss" scoped>


.layout-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 0.16fr repeat(2, 1fr);
    grid-gap: 18px 12px;

    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
}

.equal-ratio-box {
    width: 100%;
    padding-top: 34%;
    box-sizing: border-box;
    position: relative;
    background-color: red;
}
</style>
