<template>
    <div>
        <section class="tips-two" v-if="alertCountTwo.isShowyesOrNo">
            <div class="tips-content">
                <div class="tips-font line-down">
                    <!-- <p class="p-one">保单：006762144694003</p> -->
                    <p class="p-two">请确认您的{{tipsData}}{{telNo}}是否正确！</p>
                </div>
                <div class="tips-btn">
                    <div class="line-right">
                        <button class="style-click" @click="closeTipsFn">否</button>
                    </div>
                    <div>
                        <button class="style-click" @click="submitFnTwo">是</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowyesOrNo: false
            }
        },
        props:['alertCountTwo','telNo','tipsData'],
        methods: {
            closeTipsFn() {
                this.alertCountTwo.isShowyesOrNo = false
            },
            submitFnTwo() {
                this.$emit('changCount')
            }
        },
    }
</script>

<style lang="scss" scoped>
.tips-two{
    position: fixed;
    // padding: 0 0.3rem;
    background:rgba(0,0,0,0.3972);
    z-index: 9;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 0;
    top: 0;
    left: 0;
    .tips-content{
        position: fixed;
        width:5.4rem;
        background:rgba(255,255,255,1);
        border-radius:0.12rem;
        text-align: center;
        overflow: hidden;
        top: 2.94rem;
        left: 1.05rem;
        .tips-font{
            padding: 0.3rem;
            .p-one{
                font-size:0.32rem;
                font-family:PingFangSC-Medium;
                color:rgba(57,57,60,1);
                line-height:0.45rem;
            }
            .p-two{
                font-size:0.3rem;
                font-family:PingFangSC-Regular;
                color:rgba(57,57,60,1);
                line-height:0.46rem;
            }
        }
        .tips-btn{
            display: flex;
            display: -webkit-flex;
            div{
                flex: 1;
                button{
                    width: 100%;
                    height: 0.92rem;
                    background-color: #fff;
                    font-size:0.32rem;
                }
            }
        }
    }
    .tips-phone{
        position: fixed;
        top: 2.92rem;
        width: 6.82rem;
        left: 0.34rem;
        background-color: #fff;
        border-radius:0.12rem;
        overflow: hidden;
        header{
            padding: 0.26rem 0;
            text-align: center;
            font-size:0.32rem;
            font-family:PingFangSC-Medium;
            color:rgba(57,57,60,1);
            line-height:0.46rem;
        }
        .tips-number{
            padding: 0.4rem 0.34rem;
            .tips-phone-top{
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                div{
                    input{
                        width:3.6rem;
                        height:0.72rem;
                        border-radius:2px;
                        border:1px solid rgba(183,188,192,1);
                        font-size:0.28rem;
                        font-family:PingFangSC-Regular;
                        line-height:0.4rem;
                        padding: 0.16rem 0.2rem;
                        box-sizing: border-box;
                    }
                    button{
                        width:2.43rem;
                        height:0.72rem;
                        background:rgba(0,174,77,1);
                        border-radius:0.06rem;
                        font-size:0.28rem;
                        font-family:PingFangSC-Regular;
                        color:rgba(255,255,255,1);
                        line-height:0.4rem;
                    }
                    button.disable-style{
                        background:rgba(153,153,153,1);
                    }
                }
            }
            .tips-phone-down{
                font-size:0.26rem;
                font-family:PingFangSC-Regular;
                color:rgba(148,148,148,1);
                line-height:0.37rem;
                margin-top: 0.33rem;
                text-align: left;
            }
        }
        .tips-btn{
            display: flex;
            display: -webkit-flex;
            div{
                flex: 1;
                button{
                    width: 100%;
                    height: 0.92rem;
                    background-color: #fff;
                    font-size:0.32rem;
                }
            }
        }
        .tips-phone-btn{
            height: 0.92rem;
            button{
                width: 100%;
                height: 100%;
                font-size:0.32rem;
                font-family:PingFangSC-Regular;
                color:rgba(57,57,60,1);
                line-height:0.46rem;
                background-color: #fff;
            }
        }
    }
}
</style>