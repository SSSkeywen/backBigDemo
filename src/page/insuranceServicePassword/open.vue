<template>
    <div>
        <headerT :headerContent="headerContent"></headerT>
        <div>
            <ul>
                <li v-for="(item,index) in openDataLists" :key="index">
                    <hgroup>{{item.title}}</hgroup>
                    <p v-for="(itemTwo,indexTwo) in item.lists" :key="indexTwo">{{itemTwo}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import headerT from '@/components/header.vue'
import { mapActions } from "vuex";
    export default {
        data() {
            return {
                headerContent: '新增保险服务密码',
                openDataLists:[
                    {
                        title:'一、下列信息涉及您的重大权益调整，请在变更之前仔细阅读：',
                        lists:[
                            '本人同意提供给中国太平（指中国太平保险集团有限责任公司及其直接或间接控股的公司）的个人资料（包括本单证签署之前提供的以及本人接受中国太平各项服务时产生的信息），可用于中国太平及因服务必要而委托的第三方为本人提供服务及推荐产品，接收信息的主体对上述信息负有保密义务。本条款自申请确认时生效，具有独立的法律效力，不受合同成立与否及效力状态变化的影响。'
                        ]
                    }
                ]
            }
        },
        components:{headerT}
    }
</script>

<style lang="scss" scoped>

</style>