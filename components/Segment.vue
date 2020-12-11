<template>
    <div 
        class="segment" 
        :style="`height:${height}px;line-height:${height}px;top:${top}px`">
        <div 
            class="segment-item" 
            :class="{'active': selected === item.id}"
            v-for="item in list" 
            :key="item.id" 
            @click="handleClick(item.id)">
            {{item.name}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array,
        height: {
            type: Number,
            default: 36
        },
        top: {
            type: Number,
            default: 0
        },
        selected: Number
    },
    methods: {
        handleClick(i) {
            this.$emit('change', i)
        }
    }
}
</script>

<style lang="scss" scoped>
.segment {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: $theme-color * 1.2;
    display: flex;
    &-item {
        flex: 1;
        height: 100%;
        text-align: center;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        transition: color 0.3s;
        &.active {
            color: rgba(255, 255, 255, 1);
            background-color: $theme-color;
        }
    }
}
</style>