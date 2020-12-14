<template>
    <div class="team-info">
        <NavNormal 
            :height="NAV_HEIGHT" 
            :title="NAVS_MAP[team.gameType] + '详情'">
        </NavNormal>
        <div class="team-info-content" :style="`top:${NAV_HEIGHT-1}px`">
            <div class="team-head">
                <img :src="team.logo">
                <h1 class="team-head-title">{{team.fullName}}</h1>
                <div class="team-head-info">
                    <div class="team-head-info-item">
                        <p>世界排名</p>
                        <h1>{{team.worldRanking || team.ranking || '--'}}</h1>
                    </div>
                    <div class="team-head-info-item">
                        <p>所在地区</p>
                        <h1>{{team.regionName || '--'}}</h1>
                    </div>
                    <div class="team-head-info-item">
                        <p>TI积分</p>
                        <h1>{{team.score || '--'}}</h1>
                    </div>
                    <div class="team-head-info-item">
                        <p>总奖金</p>
                        <h1>{{team.totalEarnings || '--'}}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavNormal from '@/components/NavNormal'
import { NAVS_MAP, NAV_HEIGHT } from '@/utils/consts'
const url = '/app/team/findById'
export default {
    components: {
        NavNormal
    },
    async asyncData(ctx) {
        const params = { id: ctx.query.id }
        const res = await ctx.$axios({ url, params })
        return { team: res.data.data }
    },
    data() {
        return {
            NAVS_MAP, 
            NAV_HEIGHT
        }
    }
}
</script>

<style lang="scss" scoped>
.team-info {
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
        .team-head {
            height: 160px;
            background-color: $theme-color;
            text-align: center;
            color: #fff;
            img {
                width: 60px;
                height: 60px;
            }
            &-title {
                padding: 15px 0;
                font-size: 18px;
            }
            &-info {
                display: flex;
                height: 50px;
                line-height: 1.5;
                &-item {
                    flex: 1;
                    font-size: 14px;
                    h1 {
                        font-weight: 700;
                    }
                    p {
                        color: rgba(255, 255, 255, 0.7);
                    }
                }
            }
        }
    }
}
</style>