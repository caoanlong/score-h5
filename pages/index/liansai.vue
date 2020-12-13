<template>
    <div class="liansai">
        <NavBar 
            :navs="NAVS" 
            :selected="gameType" 
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
        <div 
            class="liansai-content" 
            :style="`top:${NAV_HEIGHT + STATUS_HEIGHT}px`">
            <template v-if="tournaments && tournaments.length">
                <div 
                    class="liansai-content-item van-hairline--bottom" 
                    v-for="item in tournaments" :key="item.tournamentId">
                    <div class="liansai-content-item-left">
                        <img :src="item.tournamentLogo" v-lazy="item.tournamentLogo">
                    </div>
                    <div class="liansai-content-item-right">
                        <h1 class="van-ellipsis">{{item.tournamentName}}</h1>
                        <p>{{item.startTime | transDate}} 至 {{item.endTime | transDate}}</p>
                    </div>
                </div>
            </template>
            <van-empty description="暂无数据" v-else/>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Segment from '@/components/Segment'
import { NAVS, NAV_HEIGHT } from '@/utils/consts'
const STATUS_HEIGHT = 36
const TABS = [
    { id: 1, name: '未开始' },
    { id: 2, name: '进行中' },
    { id: 3, name: '已结束' }
]
const url = '/app/tournament/findList'
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
            gameType: NAVS[0].id,
            status: TABS[0].id
        }
    },
    async asyncData(ctx) {
        const params = {
            gameType: NAVS[0].id,
            status: TABS[0].id
        }
        const res = await ctx.$axios({ url, params })
        return { tournaments: res.data.data }
    },
    methods: {
        handleType(item) {
            this.gameType = item
            this.getList()
        },
        handleStatus(status) {
            this.status = status
            this.getList()
        },
        getList() {
            this.tournaments = []
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })
            const params = {
                gameType: this.gameType,
                status: this.status
            }
            this.$axios({ url, params }).then(res => {
                this.tournaments = res.data.data
                this.$toast.clear()
            }).catch(err => {
                this.$toast.clear()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.liansai {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &-content {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
        overflow: hidden auto;
        &-item {
            height: 60px;
            background-color: #fff;
            position: relative;
            overflow: hidden;
            display: flex;
            &-left {
                width: 60px;
                text-align: center;
                font-size: 12px;
                color: #999;
                img {
                    margin-top: 10px;
                    width: 40px;
                    height: 40px;
                }
            }
            &-right {
                flex: 1;
                line-height: 1.6;
                padding: 10px 0;
                position: relative;
                overflow: hidden;
                h1 {
                    width: 100%;
                    padding-right: 30px;
                    box-sizing: border-box;
                    font-size: 14px;
                }
                p {
                    color: #999;
                    font-size: 12px;
                }
            }
            &::before {
                position: absolute;
                top: 24px;
                right: 15px;
                display: block;
                content: "";
                width: 8px;
                height: 8px;
                border-top: 2px solid #ddd;
                border-right: 2px solid #ddd;
                transform: rotate(45deg);
            }
        }
    }
}
</style>