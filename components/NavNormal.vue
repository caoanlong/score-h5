<template>
    <div 
        class="nav-normal" 
        :style="`height:${height}px;${transparent ? 'background-color: rgba(0,0,0,0)' : ''}`">
        <div 
            class="nav-normal-left" 
            :style="`width:${height}px`" @click="handleBack">
        </div>
        <div class="nav-normal-center" :style="`line-height:${height}px`">
            {{title}}
        </div>
        <div class="nav-normal-right" :style="`width:${height}px`"></div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 46
        },
        title: String,
        transparent: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-normal {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    background-color: $theme-color;
    color: #ffffff;
    position: relative;
    &-left {
        height: 100%;
        position: relative;
        &::before {
            position: absolute;
            top: 18px;
            left: 15px;
            display: block;
            content: "";
            width: 8px;
            height: 8px;
            border-top: 2px solid #fff;
            border-right: 2px solid #fff;
            transform: rotate(-135deg);
        }
    }
    &-center {
        flex: 1;
        height: 100%;
        text-align: center;
    }
    &-right {
        height: 100%;
    }
}
</style>