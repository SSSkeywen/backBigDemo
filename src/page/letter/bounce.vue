<template>
<div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <div class="contenr" v-if="this.ajaxData!=''">
        <div id="btn_quan" style="margin: 0.32rem 0px 0.28rem 0.28rem;" @click="checkAll">
            <div class="zp_t zp_quan" :class="{'zp_quan1':isCheckAll}"></div> <div class="zp_zi">全选</div>
        </div>
        <ul class="zp_ul"  v-for="(item,index) in ajaxData" :key="index">
            <li class="zp_listT"  @click="checkOne(item.policyCode)"> 
                <div class="zp_dan" :class="{'zp_dan1':selectCode.indexOf(item.policyCode)>=0}"></div>
                <div class="zp_baodan">保单号：{{item.policyCode}}</div>
            </li>
            <li class="zp_list"><div>信件类型</div><div>{{item.letterType}}</div></li>
            <li class="zp_list"><div>保单年度</div><div>{{item.beginDate}}至{{item.endDate}}</div></li>
            <li class="zp_list"><div>地址</div><div>{{item.address}}</div></li>
            <li class="zp_list"><div>邮编</div><div>{{item.postCode}}</div></li>
        </ul> 
        <div class="zp_btn">
            <a href="javascript:;" @click="addressOk()" class="btn sure">确认地址正确</a>
            <a href="javascript:;" @click="addressNew()" class="btn adress">地址已发生变化</a>
        </div>  
    </div>
    <noResult v-else></noResult>
    <div class="modle" v-show="maskTier">
        <div class="conter">
            <div class="btn_title">
                <img :src="imgsrc" alt="">
            </div>
            <div class="zp_wenzi">请先勾选您需要操作的退信！</div> 
            <a href="javascript:;" id="zp_konw" class="btn" @click="maskTog()">知道了</a>
        </div>
    </div>

</div>
</template>

<script>
import headerT from '../../components/header.vue'
import noResult from '../../components/letterComponent/noResult.vue'
import { mapActions } from "vuex";
export default {
    components: {
        headerT,
        noResult
    },
    data() {
        return {
            headerContent: '退信列表',
            imgsrc: require('@/assets/mgImg/confim.png'),
            isCheckAll:false,
            maskTier:false,
            // 选择的保单号集合
            selectCode:[],
            ajaxData:[{
                policyCode:'001',
                address:'闵行区浦江镇122号',
                letterType:'保单年度报告',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰1',
                validateDate:null,
                statusName:'有效',
                dividendTime:'2001-01-01',
                dividendNum:'1000元',
                postCode:'200000',
                postWay:'自助查询',
                beginDate:'2016-01-12',
                endDate:'2017-01-12'
             },{
                policyCode:'002',
                address:'闵行区浦江镇122号',
                letterType:'保单年度报告',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰1',
                validateDate:null,
                statusName:'有效',
                dividendTime:'2001-01-01',
                dividendNum:'1000元',
                postCode:'200000',
                postWay:'自助查询',
                beginDate:'2016-01-12',
                endDate:'2017-01-12'
             },{
                policyCode:'003',
                address:'闵行区浦江镇122号',
                letterType:'保单年度报告',
                productName:'太平爱宝贝综合意外伤害保险',
                applicantName:'范聪杰1',
                insuredName:'范聪杰1',
                validateDate:null,
                statusName:'有效',
                dividendTime:'2001-01-01',
                dividendNum:'1000元',
                postCode:'200000',
                postWay:'自助查询',
                beginDate:'2016-01-12',
                endDate:'2017-01-12'
             }]  
        }
    },
    // created(){
    //     this.getLates({
    //         successCallback: (res) => {
    //             for(let item of res.result){
    //                 if(item.statusName == '有效'){
    //                     item.statusStyle = 'green'
    //                 } 
    //                 if(item.statusName == '停效'){
    //                     item.statusStyle = 'red'
    //                 } 
    //             }
    //             this.ajaxData = res.result
    //         },
    //         fCallback:(res) => {
    //         }
    //     })
    // },
    
    methods: {
        ...mapActions({
            getLates: "getLates"
        }),
        checkAll(){
            let that = this;
            that.isCheckAll = !that.isCheckAll;
            if(that.isCheckAll){
                that.selectCode=[];
                that.ajaxData.forEach(function(item){
                    that.selectCode.push(item.policyCode)
                })
            }else{
                that.selectCode=[];
            }
        },
        checkOne(code){
           var codeIndex = this.selectCode.indexOf(code);
           if(codeIndex>=0){
              //如果包含了该code，则删除（单选按钮由选中变为非选中状态）
              this.selectCode.splice(codeIndex,1);
           }else{ //选中该按钮
              this.selectCode.push(code);
           }
           // 影响 全选  如果selectCode的长度等于数据的长度
           if (this.selectCode.length==this.ajaxData.length) {
                this.isCheckAll=true
           }else{
                this.isCheckAll=false
           }
        },
        maskTog(){
          this.maskTier=!this.maskTier;
        },
        addressNew(){
            if (this.selectCode.length==0) {
               this.maskTier=true 
            }else{
               this.$router.push({ path: '/addressNew'}); 
            }
        },
        addressOk(){
            if (this.selectCode.length==0) {
               this.maskTier=true 
            }else{
               this.$router.push({ path: '/addressOk'}); 
            }
        }
    }
}
</script>

<style>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
/*#btn_quan{display: block;}*/
</style>

