<template>
    <ul class="zp_ul">
        <li class="zp_listT" style="margin-top: 0.16rem;"> 
            <div class="zp_baodan" style="margin-left: 0.27rem;">保单号：{{item.policyCode}}</div>
        </li>
        <li v-if="item.statusName" class="zp_list"><div>保单状态</div><div>{{item.statusName}}</div></li>
        <li v-if="item.postCode" class="zp_list"><div>收费邮编</div><div>{{item.postCode}}</div></li>
        <li v-if="item.activeDate" class="zp_list"><div>保单生效日期</div><div>{{item.activeDate}}</div></li>
        <li v-if="item.dieDate" class="zp_list"><div>保单失效日期</div><div>{{item.dieDate}}</div></li>
        <li v-if="item.postWay" class="zp_list"><div>信件发送方式</div><div>{{item.postWay}}</div></li>
        <li v-if="item.payDate" class="zp_list"><div>续期保费应缴日</div><div>{{item.payDate}}</div></li>
        <li v-if="item.selectList" class="zp_list">
            <div>期数</div>
            <div>
                <select name="" id="" v-model="selected">
                    <option v-for="(itemli,index) in item.selectList" :key="index" :value="itemli.value" v-html="itemli.content">
                        {{ itemli.content }}
                    </option>
                </select>
            </div>
        </li>
        <li v-if="item.beginDate||item.endDate" class="zp_list"><div>保单年度</div><div>{{item.beginDate}}至{{item.endDate}}</div></li>
        <li class="zp_list" style="padding-bottom: 0.28rem;margin-top: 0.26rem;">
            <div></div>
            <a href="javascript:;" class="btn1" style="width: 2.4rem;" @click="see(item.policyCode,selected)">查看电子版</a>
        </li>
    </ul>
</template>

<script>
export default {
    props:['item'],
    data(){
        return {
            selected:'0'
        }
    },
    methods:{
        see(code,selectVal){
            console.log(code)
            console.log(selectVal)
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
</style>