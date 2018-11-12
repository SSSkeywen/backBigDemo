<template>
    <div class="claims-box">
        <div>
            <img :src="claimsImg" width="100%">
        </div>
        <ul class="claims-ul">
            <li v-for="(item,index) in claimsLists" :key="index">
                <p>
                    <i><img :src="item.num" alt=""></i>{{item.content}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                claimsImg: require("@/assets/claimsImg/liucheng_03.png"),
                claimsLists:[
                    {
                        num:require("@/assets/claimsImg/liucheng_4.png"),
                        content:'发生保险事故，应及时向公司报案并按合同要求准备理赔申请资料；'
                    },{
                        num:require("@/assets/claimsImg/liucheng_5.png"),
                        content:'向公司提出理赔申请并由本人或委托他人递交理赔申请的相关资料；'
                    },{
                        num:require("@/assets/claimsImg/liucheng_6.png"),
                        content:'公司理赔部门在收到客户申请资料后，即时受理申请；'
                    },{
                        num:require("@/assets/claimsImg/liucheng_7.png"),
                        content:'理财人员对理赔申请进行审核并对事故及资料进行了解核实；'
                    },{
                        num:require("@/assets/claimsImg/liucheng_8.png"),
                        content:'理赔人员核定申请事由是否属于保险责任、厘定赔付金额并作出理赔结论；'
                    },{
                        num:require("@/assets/claimsImg/liucheng_9.png"),
                        content:'理赔结案，公司给付理赔金或其它书面通知。'
                    }
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
.claims-box{
    min-height: 100vh;
    background: #f1f1f1;
    padding: 0.1rem;
    box-sizing: border-box;
}
.claims-ul{
    li{
        margin: 10px 0;
        p{
            i{
                margin: 0 5px;
                img{
                    display: inline-block;
                    vertical-align: top;
                }
            }
        }
    }
}
</style>