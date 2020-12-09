<template>
    <div class="tab-item" :class="{active}">
        <svg-icon className="tab-item-icon" :icon-class="tab.icon"></svg-icon>
        <p>{{tab.name}}</p>
    </div>
</template>

<script>
export default {
    props: {
        tab: Object,
        active: Boolean
    }
}
</script>

<style lang="scss" scoped>
.tab-item {
    text-align: center;
    padding: 5px 0;
    position: relative;
    cursor: pointer;
    &-icon {
        color: #c6c6c6;
        font-size: 24px;
    }
    p {
        margin-top: 3px;
        font-size: 12px;
        color: #787878;
        transform: scale(0.85);
    }
    &.active {
        .tab-item-icon, p {
            color: #168ef0;
            font-weight: bold;
        }
    }
}
</style>