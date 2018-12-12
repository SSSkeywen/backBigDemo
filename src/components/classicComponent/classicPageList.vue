<template>
    <div class="cp-box">
        <hgroup class="cp-hgroup" @click="myGuaranteeSlip(pageListData.allPagePath)">
            <p class="cp-hgroup-font">{{pageListData.pageTitle}}</p>
            <div class="cp-div">
                <p>全部</p>
                <div class="cp-img">
                    <img :src="rightImgSrc" alt="">
                </div>
                
            </div>
        </hgroup>
        <ul class="cp-list">
            <li v-for="(item,index) in pageListData.pageLists" :key="index" @click="jumpMessagePage(item.pagePath)">
                <img :src="item.pageBg" width="100%">
                <div class="cp-list-content">
                    <p class="cp-list-p" v-html="item.pageName"></p>
                    <div class="cp-list-div">
                        <img :src="item.pageIcon" width="100%">
                    </div>
                    
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rightImgSrc: require('@/assets/classicImg/Icon@toRight.png'),
            }
        },
        props:['pageListData'],
        methods: {
            myGuaranteeSlip(pageAddress) {
                this.$router.push({ path: pageAddress });
            },
            jumpMessagePage(pageAddress) {
                let isBinding = JSON.parse(window.localStorage.getItem('isBinding'))
                console.log(this.pageListData)
                if(isBinding == '1'){
                    this.$router.push({ path: pathAddress });
                }else{
                    this.$router.push({ path: '/userInfo',query: {pathAddress: pathAddress} });
                }
                // console.log(pageAddress)
                // this.$router.push({ path: pageAddress });
            },
        },
    }
</script>

<style lang="scss" scoped>
.cp-box{
    padding: 0rem 0.28rem;
    .cp-hgroup{
        display: flex;
        justify-content: space-between;
        .cp-hgroup-font{
            font-size:0.4rem;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(57,57,60,1);
            line-height:0.4rem;
        }
        .cp-div{
            display: flex;
            p{
                font-size:0.26rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(142,148,157,1);
                margin-right: 0.1rem;
            }
            .cp-img{
                width: 0.12rem;
                position: relative;
                top: 0.06rem;
                img{
                    width: 100%;
                }
            }
        }
    }
    .cp-list{
        padding: 0.4rem 0.23rem 0;
        display: flex;
        justify-content: space-between;
        li{
            position: relative;
            width: 1.35rem;
            .cp-list-content{
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                position: absolute;
                left: 0;
                top: 0;
                padding: 0.16rem 0 0.14rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .cp-list-div{
                    width: 0.52rem;
                }
                .cp-list-p{
                    font-size:0.24rem;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:0.24rem;
                }
            }
        }
    }
}
</style>