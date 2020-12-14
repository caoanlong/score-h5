<template>
    <div class="tournament-info">
        <NavNormal 
            :height="NAV_HEIGHT" 
            :title="NAVS_MAP[tournament.gameType] + '详情'">
        </NavNormal>
        <div class="tournament-info-content" :style="`top:${NAV_HEIGHT-1}px`">
            <div class="tournament-head">
                <img :src="tournament.tournamentLogo">
                <h1 class="tournament-head-title">{{tournament.tournamentName}}</h1>
                <p class="tournament-head-time">
                    {{tournament.startTime | transDate}}
                     至 
                    {{tournament.endTime | transDate}} 
                    {{TOURNAMENT_STAUS_MAP[tournament.status]}}
                </p>
            </div>
            <van-tabs 
                class="tournament-tab" 
                v-model="currentTab" 
                color="#168ef0"
                animated 
                @change="handleTabChange">
                <van-tab 
                    v-for="(tab, i) in TABS" 
                    :key="i" 
                    :title="tab.name" 
                    :name="tab.id">
                    <template v-if="tab.id === 0">
                        <template v-if="tournament.matches && tournament.matches.length > 0">
                            <div 
                                class="tournament-tab-match" 
                                v-for="match in tournament.matches" 
                                :key="match.matchId">
                                <div class="tournament-tab-match-left">
                                    <h1>{{match.matchTime | transDate3}}</h1>
                                    <p>{{match.matchTime | transTime}}</p>
                                </div>
                                <div class="tournament-tab-match-center">
                                    <div class="tournament-tab-match-center-left van-ellipsis">
                                        <template v-if="match.home">
                                            {{match.home.fullName}}
                                            <img :src="match.home.logo" v-lazy="match.home.logo">
                                        </template>
                                    </div>
                                    <div class="tournament-tab-match-center-center">VS</div>
                                    <div class="tournament-tab-match-center-right van-ellipsis">
                                        <template v-if="match.away">
                                            <img :src="match.away.logo" v-lazy="match.away.logo">
                                            {{match.away.fullName}}
                                        </template>
                                    </div>
                                </div>
                                <div class="tournament-tab-match-right">
                                    BO{{match.box}}
                                </div>
                            </div>
                        </template>
                        <van-empty v-else description="暂无数据"/>
                    </template>
                    <template v-else-if="tab.id === 1">
                        <van-empty description="暂无数据"/>
                    </template>
                    <template v-else-if="tab.id === 2">
                        <van-empty description="暂无数据"/>
                    </template>
                    <template v-else>
                        <van-empty description="暂无数据"/>
                    </template>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import NavNormal from '@/components/NavNormal'
import { NAVS_MAP, NAV_HEIGHT, TOURNAMENT_STAUS_MAP } from '@/utils/consts'
const url = '/app/tournament/findById'
const TABS = [
    { id: 0, name: '赛事进度' },
    { id: 1, name: '赛事数据' },
    { id: 2, name: '参赛战队' },
    { id: 3, name: '相关资讯' }
]
export default {
    components: {
        NavNormal,
    },
    async asyncData(ctx) {
        const params = { id: ctx.query.id }
        const res = await ctx.$axios({ url, params })
        return { tournament: res.data.data }
    },
    data() {
        return {
            NAVS_MAP,
            NAV_HEIGHT,
            TOURNAMENT_STAUS_MAP,
            TABS,
            currentTab: TABS[0].id
        }
    },
    methods: {
        handleTabChange(i) {

        }
    }
}
</script>

<style lang="scss" scoped>
.tournament-info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &-content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden auto;
        .tournament-head {
            height: 140px;
            background-color: $theme-color;
            text-align: center;
            color: #fff;
            img {
                height: 60px;
            }
            &-title {
                padding: 15px 0;
                font-size: 18px;
            }
            &-time {
                font-size: 14px;
            }
        }
        .tournament-tab {
            &-match {
                margin-top: 10px;
                height: 50px;
                background-color: #fff;
                display: flex;
                &-left {
                    width: 70px;
                    text-align: center;
                    font-size: 13px;
                    line-height: 1.5;
                    padding-top: 5px;
                    h1 {
                        font-weight: bold;
                    }
                }
                &-center {
                    flex: 1;
                    line-height: 50px;
                    font-size: 13px;
                    display: flex;
                    &-left {
                        flex: 1;
                        text-align: right;
                        padding-right: 10px;
                        img {
                            width: 20px;
                            height: 20px;
                            position: relative;
                            top: 5px;
                        }
                    }
                    &-center {
                        width: 50px;
                        text-align: center;
                        font-size: 14px;
                        color: #ff6900;
                        font-weight: bold;
                    }
                    &-right {
                        flex: 1;
                        text-align: left;
                        padding-left: 10px;
                        img {
                            width: 20px;
                            height: 20px;
                            position: relative;
                            top: 5px;
                        }
                    }
                }
                &-right {
                    width: 60px;
                    color: #999;
                    text-align: center;
                    line-height: 50px;
                }
            }
        }
    }
}
</style>