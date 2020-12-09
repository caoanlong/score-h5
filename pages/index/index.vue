<template>
    <div class="match">
        <NavBar 
            :navs="NAVS" 
            :selected="gameTypes" 
            :height="NAV_HEIGHT" 
            @change="handleType">
        </NavBar>
        <van-tabs 
            class="match-tab" 
            :style="`top:${NAV_HEIGHT}px`" 
            v-model="gameStatus" 
            color="#168ef0"
            animated 
            @change="handleStatus">
            <van-tab 
                v-for="tab in TABS" 
                :key="tab.id" 
                :title="tab.name" 
                :name="tab.id">
                <div class="match-tab-content" v-if="dayMatches && dayMatches.length">
                    <div 
                        class="match-tab-content-item"
                        v-for="match in dayMatches" 
                        :key="match.matchId">
                        <div class="match-tab-content-item-top van-hairline--bottom">
                            <img :src="match.tournamentLogo">
                            <span>{{match.tournamentShortName}}</span>
                            &nbsp;
                            <span>BO{{match.box}}</span>
                        </div>
                        <div class="match-tab-content-item-bottom">
                            <div class="match-tab-content-item-bottom-left">
                                {{match.matchTime | transTime}}
                            </div>
                            <div class="match-tab-content-item-bottom-center"></div>
                            <div class="match-tab-content-item-bottom-right"></div>
                        </div>
                    </div>
                </div>
                <van-empty description="暂无数据" v-else/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState, mapMutation } from 'vuex'
import NavBar from '@/components/NavBar'
const NAV_HEIGHT = 44
const NAVS = [
    { id: 'lol', name: '英雄联盟' },
    { id: 'dota', name: 'DOTA2' },
    { id: 'kog', name: '王者荣耀' },
    { id: 'csgo', name: 'CS:GO' }
]
const TABS = [
    { id: 1, name: '未开始' },
    { id: 2, name: '进行中' },
    { id: 3, name: '赛果' },
    { id: 66, name: '其他' }
]
const url = 'https://m.shangniu.cn/api/game/user/app/index/matchList'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            NAV_HEIGHT,
            NAVS,
            TABS,
            gameTypes: NAVS[0].id,
            gameStatus: TABS[0].id
        }
    },
    async asyncData(ctx) {
        const params = {
            getType: 3,
            gameTypes: NAVS[0].id,
            gameStatus: TABS[0].id,
            time: dayjs().format('YYYY-MM-DD')
        }
        const { data } = await ctx.$axios({ url, params })
        return { dayMatches: data.body.dayMatches }
    },
    methods: {
        handleType(item) {
            this.gameTypes = item
            this.getList()
        },
        handleStatus() {
            this.getList()
        },
        getList() {
            this.dayMatches = []
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })
            const params = {
                getType: 3,
                gameTypes: this.gameTypes,
                gameStatus: this.gameStatus,
                time: dayjs().format('YYYY-MM-DD')
            }
            this.$axios({ url, params }).then(res => {
                this.dayMatches = res.data.body.dayMatches
                this.$toast.clear()
            }).catch(err => {
                this.$toast.clear()
            })
        }
    }
}
</script>
<style lang="scss">
.match {
    .van-tabs__wrap {
        height: 36px;
    }
    .van-tabs__content {
        height: calc(100% - 36px);
    }
    .van-tab__pane {
        height: 100%;
    }
}
</style>
<style lang="scss" scoped>
.match {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &-tab {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        &-content {
            width: 100%;
            height: 100%;
            overflow: hidden auto;
            &-item {
                width: 100%;
                background-color: #fff;
                margin-top: 8px;
                padding: 0 10px;
                position: relative;
                &:last-child {
                    margin-bottom: 8px;
                }
                &-top {
                    height: 40px;
                    line-height: 40px;
                    font-size: 13px;
                    img {
                        width: 16px;
                        margin-right: 5px;
                        position: relative;
                        top: 3px;
                    }
                    &::before {
                        position: absolute;
                        top: 14px;
                        right: 0;
                        display: block;
                        content: "";
                        width: 8px;
                        height: 8px;
                        border-top: 2px solid #ddd;
                        border-right: 2px solid #ddd;
                        transform: rotate(45deg);
                    }
                }
                &-bottom {
                    height: 50px;
                    line-height: 50px;
                    display: flex;
                    &-left {
                        width: 60px;
                        font-size: 12px;
                        color: #999;
                    }
                    &-center {
                        flex: 1;
                    }
                    &-right {
                        width: 60px;
                    }
                }
            }
        }
    }
}
</style>