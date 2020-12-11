<template>
    <div class="match">
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
            :selected="gameStatus" 
            @change="handleStatus">
        </Segment>
        <van-tabs 
            class="match-tab" 
            :style="`top:${NAV_HEIGHT + STATUS_HEIGHT}px`" 
            v-model="currentDate" 
            color="#168ef0"
            animated 
            @change="handleDateChange">
            <van-tab 
                v-for="(date, i) in dates" 
                :key="i" 
                :title="date | transDate2" 
                :name="date | transDate">
                <div class="match-tab-content" v-if="matches && matches.length">
                    <div 
                        class="match-tab-content-item"
                        v-for="match in matches" 
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
                            <div class="match-tab-content-item-bottom-center">
                                <div 
                                    class="match-tab-content-item-bottom-center-left van-ellipsis"
                                    :style="`background-image:url(${match.homeLogo})`">
                                    {{match.homeShortName}}
                                </div>
                                <div class="match-tab-content-item-bottom-center-center"></div>
                                <div 
                                    class="match-tab-content-item-bottom-center-right van-ellipsis"
                                    :style="`background-image:url(${match.awayLogo})`">
                                    {{match.awayShortName}}
                                </div>
                            </div>
                            <div class="match-tab-content-item-bottom-right">
                                <svg-icon icon-class="icon-video"></svg-icon>
                            </div>
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
    { id: 3, name: '赛果' },
    { id: 15, name: '其他' }
]
const url = '/app/match/findList'
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
            gameStatus: TABS[0].id,
            currentDate: dayjs().format('YYYY-MM-DD')
        }
    },
    async asyncData(ctx) {
        const dates = []
        for (let i = 5; i >= 0; i--) {
            dates.push(dayjs().subtract(i, 'day'))
        }
        for (let i = 0; i < 5; i++) {
           dates.push(dayjs().add(i + 1, 'day'))
        }
        const params = {
            getType: 3,
            gameTypes: NAVS[0].id,
            gameStatus: TABS[0].id,
            time: dayjs().format('YYYY-MM-DD')
        }
        const res = await ctx.$axios({ url, params })
        return { matches: res.data.data, dates }
    },
    methods: {
        handleType(item) {
            this.gameTypes = item
            this.getList()
        },
        handleStatus(item) {
            this.gameStatus = item
            this.getList()
        },
        handleDateChange(date) {
            this.currentDate = date
            this.getList()
        },
        getList() {
            this.matches = []
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })
            const params = {
                getType: 1,
                gameTypes: this.gameTypes,
                gameStatus: this.gameStatus,
                time: this.currentDate
            }
            this.$axios({ url, params }).then(res => {
                this.matches = res.data.data
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
                        width: 50px;
                        font-size: 12px;
                        color: #999;
                    }
                    &-center {
                        flex: 1;
                        font-size: 12px;
                        display: flex;
                        &-left {
                            flex: 1;
                            text-align: right;
                            padding-right: 30px;
                            background-repeat: no-repeat;
                            background-size: 20px;
                            background-position: right center;
                        }
                        &-center {
                            width: 50px;
                            background-image: url('../../assets/imgs/dz.png');
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: 16px;
                        }
                        &-right {
                            flex: 1;
                            text-align: left;
                            padding-left: 30px;
                            background-repeat: no-repeat;
                            background-size: 20px;
                            background-position: left center;
                        }
                    }
                    &-right {
                        width: 30px;
                        font-size: 20px;
                        text-align: right;
                        color: $theme-color;
                    }
                }
            }
        }
    }
}
</style>