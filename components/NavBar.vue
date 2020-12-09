<template>
    <div class="nav van-hairline--bottom" :style="`height:${height}px`">
        <div 
            class="nav-item" 
            :class="{'active': selected === nav.id}"
            v-for="nav in navs" 
            :key="nav.id" @click="handleNav(nav.id)">
            {{nav.name}}
        </div>
    </div>
</template>

<script>

export default {
    props: {
        height: {
            type: Number,
            default: 44
        },
        navs: Array,
        selected: String | Number
    },
    methods: {
        handleNav(item) {
            this.$emit('change', item)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    &-item {
        width: 80px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 13px;
        font-size: 14px;
        &.active {
            color: #fff;
            background-color: #168ef0;
        }
    }
}
</style>