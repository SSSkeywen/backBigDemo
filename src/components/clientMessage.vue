<template>
    <div>
        <header class="cm-header">
            <img :src="bannerImgSrc" width="100%">
            <div class="scan-style">
                <img :src="scanImgSrc" width="100%">
            </div>
            <div class="cm-jump-page">
                <div class="cm-jump-content">
                    <p>VIP服务</p>
                    <div class="cm-jump-ing">
                        <img :src="jumpIconImgSrc" width="100%">
                    </div>
                </div>
            </div>
            <div class="cm-client-photo">
                <img :src="scanImgSrc" alt="">
            </div>
            <div>
                
            </div>
        </header>
       <!-- <div><van-button type="warning">警告按钮</van-button></div> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bannerImgSrc: require('@/assets/classicImg/banner@gif.gif'),
                scanImgSrc: require('@/assets/classicImg/scan@img.png'),
                // jumpBgImgSrc: require('@/assets/classicImg/jump@bg.png'),
                jumpIconImgSrc: require('@/assets/classicImg/jump@icon.png'),
            }
        },
    }
</script>

<style lang="scss" scoped>
.cm-header{
    width: 100%;
    height: 3.64rem;
    overflow: hidden;
    position: relative;
    .scan-style{
        position: absolute;
        width: 0.67rem;
        top: 0.33rem;
        left: 0.47rem;
    }
    .cm-jump-page{
        position: absolute;
        top: 0.32rem;
        right: 0;
        width: 1.46rem;
        height: 0.48rem;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 0.48rem 0 0 0.48rem;
        padding: 0.11rem 0.12rem 0.11rem 0.14rem;
        .cm-jump-content{
            display: flex;
            p{
                font-size:0.26rem;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(192,165,79,1);
                line-height:0.26rem;
            }
            .cm-jump-ing{
                width: 0.22rem;
                position: relative;
                top: 0.03rem;
                left: 0.05rem;
            }
        }
    }
    .cm-client-photo{
        position: absolute;
        top: 0.76rem;
        left: 3.08rem;
        width: 1.34rem;
        height: 1.34rem;
        border-radius: 1.34rem;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
}
</style>