<template>
    <div class="change-bg">
        <headerT :headerContent="headerContent"></headerT>
        <ul class="cp-ul">
            <li>
                <p>详细地址</p>
                <div>
                    <input type="tel">
                </div>
            </li>
            <li class="line-new">
                <p>邮政编码</p>
                <div>
                    <input type="tel">
                </div>
            </li>
            <li class="line-new">
                <p>电话号码</p>
                <div>
                    <input type="tel">
                </div>
            </li>
        </ul>
        <btnComponent :btnCount="btnCount"></btnComponent>
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import btnComponent from '../../components/btnComponent.vue'
    export default {
        data() {
            return {
                headerContent: '单位信息变更',
                btnCount:'确认变更'
            }
        },
        components:{
            headerT,
            btnComponent
        },
    }
</script>

<style lang="scss" scoped>
.cp-ul{
    padding-left: 0.2rem;
    background-color: #fff;
    margin-top: 0.4rem;
    li{
        display: flex;
        line-height: 0.9rem;
        font-size: 0.32rem;
        p{
            flex: 0.3;
        }
        div{
            flex: 0.7;
            padding: 0.1rem 0;
            box-sizing: border-box;
            height: 0.9rem;
            input{
                width: 100%;
                line-height: 0.7rem;
                display: block;
            }
        }
    }
}
</style>