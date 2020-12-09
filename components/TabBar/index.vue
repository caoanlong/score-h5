<template>
    <div class="tab-bar" :style="`height:${height}px`">
        <div 
            class="tab-bar-item" 
            v-for="tab in tabs" 
            :key="tab.id">
            <TabItem 
                :active="current.id === tab.id" 
                :tab="tab" 
                @click.native="handleClick(tab)">
            </TabItem>
        </div>
        
    </div>
</template>

<script>
import TabItem from './TabItem'
export default {
    name: 'TabBar',
    components: {
        TabItem
    },
    props: {
        height: {
            type: Number,
            default: 58
        },
        tabs: Array,
        current: Object
    },
    methods: {
        handleClick(item) {
            this.$emit('change', item)
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-bar {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #f7f7f7;
    border-radius: 8px 8px 0 0;
    display: flex;
    &-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>