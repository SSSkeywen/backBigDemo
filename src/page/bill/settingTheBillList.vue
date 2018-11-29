<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <section class="casemx-section">
            <hgroup>发票已开具</hgroup>
            <p class="xu-line">····························································································································</p>
            <ul class="case-list">
                <li>
                    <p>电子发票</p>
                    <div>
                        <button class="style-click" @click="lookMsg">查看详情</button>
                    </div>
                </li>
            </ul>
        </section>
        <p class="cm-tips">注：电子发票格式为JPG，请查看或点击图片保存</p>
        <section class="cm-btn">
            <button class="style-click">关闭</button>
        </section>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
    export default {
        components:{
            headerT,
        },
        data() {
            return {
                headerContent: '理赔账单查询'
            }
        },
        methods: {
            lookMsg() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.casemx-box{
    min-height: 100vh;
    background: #DCDCDC;
    .casemx-section{
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        background: url(../../assets/billImg/billBg.png) no-repeat;
        background-size: 100% 100%;
        border-radius: 0;
        hgroup{
            width: 80%;
            margin: 0px auto;
            line-height: 0.48rem;
            font-size: 0.36rem;
            text-align: center;
            padding-top: 0.2rem;
        }
        .xu-line{
            width: 90%;
            margin: 0 auto;
            overflow: hidden;
            font-size: 0.36rem;
            line-height: 0.6rem;
        }
        .case-list{
            width: 90%;
            margin: 0 auto;
            li{
                width: 100%;
                display: flex;
                justify-content: space-between;
                line-height: 0.8rem;
                border-bottom: 1px solid #DCDCDC;
                div{
                    width: 35%;
                    button{
                        width: 100%;
                        line-height: 0.52rem;
                        border: none;
                        background: #00ae4d;
                        color: #fff;
                        border-radius: 2px;
                    }
                }
            }
        }
    }
    .cm-tips{
        color: #5c5b5b;
        width: 90%;
        margin: 0 auto;
        margin-top: 0.2rem;
    }
    .cm-btn{
        width: auto;
        margin: 1.17647059em 15px 0.3em;
        button{
            width: 100%;
            height: 46px;
            background-color: #00ae4d;
            border-radius: 5px;
            color: #fff;
            font-size: 0.36rem;
            border: none;
        }
    }
}
</style>