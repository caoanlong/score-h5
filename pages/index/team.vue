<template>
    <div class="team">
        <NavBar 
            :navs="NAVS" 
            :selected="gameType" 
            :height="NAV_HEIGHT" 
            @change="handleType">
        </NavBar>
        <div class="team-content clearfix" :style="`top:${NAV_HEIGHT}px`">
            <template v-if="teams && teams.length">
                <div 
                    class="team-content-item" 
                    v-for="item in teams" 
                    :key="item.id">
                    <div class="team-content-item-in">
                        <img :src="item.logo" v-lazy="item.logo">
                        <p class="van-multi-ellipsis--l2">{{item.fullName}}</p>
                    </div>
                </div>
            </template>
            <van-empty description="暂无数据" v-else/>
        </div>
    </div>
</template>

<script>
import { NAVS, NAV_HEIGHT } from '@/utils/consts'
const url = '/app/team/findList'
export default {
    data() {
        return {
            NAVS, NAV_HEIGHT,
            gameType: NAVS[0].id
        }
    },
    async asyncData(ctx) {
        const params = {
            gameType: NAVS[0].id
        }
        const res = await ctx.$axios({ url, params })
        return { teams: res.data.data }
    },
    methods: {
        handleType(item) {
            this.gameType = item
            this.getList()
        },
        getList() {
            this.teams = []
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            })
            const params = {
                gameType: this.gameType
            }
            this.$axios({ url, params }).then(res => {
                this.teams = res.data.data
                this.$toast.clear()
            }).catch(err => {
                this.$toast.clear()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.team {
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
        background-color: #fff;
        padding: 4px;
        overflow: hidden auto;
        &-item {
            float: left;
            width: 25%;
            text-align: center;
            padding: 6px;
            &-in {
                height: 100px;
                border: 1px solid #ddd;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                img {
                    display: block;
                    width: 46px;
                    height: 46px;
                }
                p {
                    padding: 0 5px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>