<template>
    <div class="match-item">
        <div class="match-item-top van-hairline--bottom">
            <img :src="match.tournamentLogo" v-lazy="match.tournamentLogo">
            <span>{{match.tournamentName}}</span>
            &nbsp;
            <span>BO{{match.box}}</span>
        </div>
        <div class="match-item-bottom">
            <div class="match-item-bottom-left">
                {{match.matchTime | transTime}}
            </div>
            <div class="match-item-bottom-center">
                <div class="match-item-bottom-center-left van-ellipsis">
                    {{match.homeShortName}}
                    <img :src="match.homeLogo" v-lazy="match.homeLogo">
                </div>
                <div class="match-item-bottom-center-center">
                    <img src="~assets/imgs/dz.png">
                </div>
                <div class="match-item-bottom-center-right van-ellipsis">
                    <img :src="match.awayLogo" v-lazy="match.awayLogo">
                    {{match.awayShortName}}
                </div>
            </div>
            <div class="match-item-bottom-right">
                <svg-icon icon-class="icon-video"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        match: Object
    }
}
</script>

<style lang="scss" scoped>
.match-item {
    width: 100%;
    background-color: #fff;
    padding: 0 10px;
    position: relative;
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
                img {
                    width: 16px;
                    position: relative;
                    top: 5px;
                }
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
            width: 30px;
            font-size: 20px;
            text-align: right;
            color: $theme-color;
        }
    }
}
</style>