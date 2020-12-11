<template>
    <div class="liansai">
        <NavBar 
            :navs="NAVS" 
            :selected="gameTypes" 
            :height="NAV_HEIGHT" 
            @change="handleType">
        </NavBar>
        <Segment 
            :list="TABS" 
            :height="STATUS_HEIGHT" 
            :top="NAV_HEIGHT" 
            :selected="status" 
            @change="handleStatus">
        </Segment>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Segment from '@/components/Segment'
const NAV_HEIGHT = 44
const STATUS_HEIGHT = 36
const NAVS = [
    { id: 'dota', name: 'DOTA2' },
    { id: 'csgo', name: 'CS:GO' },
    { id: 'lol', name: '英雄联盟' },
    { id: 'kog', name: '王者荣耀' }
]
const TABS = [
    { id: 1, name: '未开始' },
    { id: 2, name: '进行中' },
    { id: 3, name: '已结束' }
]
export default {
    components: {
        NavBar,
        Segment
    },
    data() {
        return {
            NAV_HEIGHT,
            STATUS_HEIGHT,
            NAVS,
            TABS,
            gameTypes: NAVS[0].id,
            status: TABS[0].id
        }
    },
    methods: {
        handleType(item) {
            this.gameTypes = item
            // this.getList()
        },
        handleStatus(i) {
            this.status = i
        }
    }
}
</script>

<style lang="scss" scoped>
.liansai {

}
</style>