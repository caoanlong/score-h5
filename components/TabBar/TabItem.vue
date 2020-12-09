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
    width: 60px;
    height: 46px;
    text-align: center;
    border-radius: 7px;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(321deg, #ffffff, #ebebeb);
    border-top: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    padding: 5px 0;
    position: relative;
    cursor: pointer;
    &-icon {
        color: #c6c6c6;
        font-size: 18px;
    }
    p {
        margin-top: 3px;
        font-size: 12px;
        color: #787878;
        transform: scale(0.85);
    }
    &.active {
        border: 1px solid #ffffff;
        background-image: linear-gradient(to right, rgba(247, 247, 247, 0), #f3f3f3);
        box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.15), inset -3px -3px 5px #ffffff;
        .tab-item-icon, p {
            color: #025E77;
            font-weight: bold;
        }
    }
}
</style>