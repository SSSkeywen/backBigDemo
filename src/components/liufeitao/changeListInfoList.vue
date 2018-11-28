<template>
    <div>
        <section class="mp-box-one">
            <ul class="mp-list">
                <li class="mp-list-li line-down">
                    <p>保全项目：</p>
                    <p v-text="changeListInfoData.preserveName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保全操作状态：</p>
                    <p v-text="changeListInfoData.preserveStatus"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保全批单号：</p>
                    <p v-text="changeListInfoData.preserveCode"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>申请人名称：</p>
                    <p v-text="changeListInfoData.applicantName"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保全申请时间：</p>
                    <p v-text="changeListInfoData.applyDate"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>保全生效时间：</p>
                    <p v-text="changeListInfoData.startDate"></p>
                </li>
                <li class="mp-list-li line-down">
                    <p>批文信息：</p>
                    <p class="green" @click="seek(changeListInfoData.preserveCode)">点击查看</p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import {dateStyle} from '@/filter/dateStyle.js'
    export default {
        props:['changeListInfoData'],
        data() {
            return {
                imgSrc: require('@/assets/mgImg/icon_xin.png'),
            }
        },
        filters: {
            dateFilter(date){
                return dateStyle(date)
            }
        },
        
        methods:{
            // 查看批文
            seek(preserveCode){
                 this.$router.push({ path: '/approvalMsg' });
            }
        }
    }
</script>

<style lang="scss" scoped>
.mp-box-one{
    width: 95%;
    background-color: #fff;
    margin: 10px auto;
    padding: 0 0.3rem 0.2rem;
    border-radius: 10px;
    box-sizing: border-box;
    .mp-min-title{
        display: flex;
        justify-content: space-between;
        line-height: 0.8rem;
        .mp-min-left{
            display: flex;
            font-weight: 600;
            .mp-min-left-img{
                width: 0.3rem;
                padding-top: 0.17rem;
                margin-right: 0.2rem;
                img{
                    width: 100%;
                    display: block;
                }
            }
        }
        .mp-min-right{
            width: 0.44rem;
            padding-top: 0.22rem;
            img{
                width: 100%;
            }
        }
    }
    .mp-list{
        .mp-list-li{
            display: flex;
            justify-content: space-between;
            line-height: 0.52rem;
        }
        .mp-list-li:last-child{
            padding-bottom: 0.1rem;
        }
    }
    
}
// liuft
    .line-down:before{
        display: none;
    }
.green{
    color: #00ae4d;
}
.red{
   color: #898b8b; 
}
</style>