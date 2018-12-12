<template>
<div class="content">
    <div>
        <div class="content_total">
            <a href="#" @click="toDetial(0)">
                <span class="title">现有账户价值</span>
                <span style="font-size:1.0em;color:#ffffff">（含贷款本息）（元）：</span>
                <br>
                <span v-if="worthData.universalValue!=null" class="title_detail">{{worthData.universalValue}}
                    <!-- <numScroll :value="worthData.universalValue"></numScroll> -->
                </span> 
                <span v-if="worthData.universalValue==null" class="title_detail">客官莫急</span> 
            </a> 
        </div>
        <div class="content_now">
            <a href="#" @click="toDetial('total')">
                <span class="title1">累计收益（元）：</span>
                <br>
                <br>
                <span v-if="worthData.totalDepositAmount!=null" class="title_detail1">{{worthData.totalDepositAmount}}
                     <!-- <numScroll :value="worthData.totalDepositAmount"></numScroll> -->
                </span> 
                <span v-if="worthData.totalDepositAmount==null" class="title_detail1">客官莫急</span> 
                <span style="float: right;margin-top:0px;"><img :src="imgSrc1" width="100%" height="80%">
                </span> 
            </a>
        </div>
        <br>
        <br>
        <br>
        <div class="content_shouyi">
            <table width="90%" height="100%">
                <tr>
                    <td>
                        <a href="#" @click="toDetial('month')">
                            <span class="titleFont">近一月收益（元）：</span>
                            <br> 
                            <span class="font1"><label>{{worthData.oneMonthProfit}}</label></span> 
                        </a>
                    </td>
                    <td class="border">
                        <a href="#" @click="toDetial('year')">
                            <span class="titleFont">近一年收益（元）：</span>
                            <br>
                            <span class="font1">{{worthData.oneYearProfit}}</span>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="#" @click="toDetial('lqje')">
                            <span class="titleFont">总领取金额（元）：</span>
                            <br> 
                            <span class="font1">{{worthData.totalPayAmount}}</span> 
                        </a>
                    </td>
                    <td class="border">
                        <a href="#" @click="toDetial('trje')">
                            <span class="titleFont">总投入金额（元）：</span>
                            <br> 
                            <span class="font1">{{worthData.totalReceiveAmount}}</span> 
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <br>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <span class="font2">近六月 {{chartTitle}} 结算利率(%):</span>
    <br>
    <div id="main" style="height: 310px;" class="main">
    </div>
    <div style="padding:0 10 0 10">
    <span color="black">*特别提醒：未来日期的结算利率可能会有所变化，最终以我司官网公布的结算利率为准，收益计算系截止到保单最新账户结算日数据。</span>
    </div>
    <span size="" color="red"></span>
</div>
</template>


<script>
// import numScroll from '../../components/numScroll.vue';
import { mapActions } from "vuex";
export default {
    components:{
        // numScroll
    },
    data() {
        return {
            imgSrc1: require('@/assets/mgImg/zfb.png'),
            worthData:{},
            // rates:[],
            // months:[],
            chartTitle:'',
            myChart:'',
            option:{
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                grid:{x:"30px",x2:"30px",borderWidth:0},
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'利率',
                        type:'line',
                        stack: '总量',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [],
                        showAllsymbol:true,
                        symbolSize:8,
                        markPoint:{
                            data:[
                                {type:'max',name:'最大值'},
                                {type:'min',name:'最小值'},
                                {name:'最近',value:0,xAxis :1,yAxis :0}
                            ],
                            symbolSize:36
                        },
                    }
                ]
            }
        }
    },
    created(){
        let pid = this.$route.query.productId;
        switch(pid){
            case (1133):
            this.chartTitle='金账户';
            break;
            
            case (1192):
            this.chartTitle='财富金账户';
            break;
            
            case (1193):
            this.chartTitle='财富钻账户';
            break;
            
            case (3487):
            this.chartTitle='幸福金账户';
            break;
            
            case (3611):
            this.chartTitle='财富金账户';
            break;
            
            case (1163):
            this.chartTitle='钻石账户';
            break;

            case (1182):
            this.chartTitle='云账户';
            break;

            case (1179):
            this.chartTitle='盈账户';
            break;  
        }
        let typeData = {
            productId:this.$route.query.productId,
            policyId:this.$route.query.policyId,
            itemId:this.$route.query.itemId
        };
        // console.log(typeData);w
        this.getUniversalWorth({
            typeData,
            successCallback: (res) => {
                console.log(typeData);
                this.worthData = res.data;
                let mont = this.worthData.month.split(',')
                let rates =  this.worthData.rate.split(',')
                this.option.xAxis[0].data =this.worthData.month.split(','); 
                this.option.series[0].data =this.worthData.rate.split(',');
                this.option.series[0].markPoint.data[2].value =this.worthData.nearlyrate;
                this.option.series[0].markPoint.data[2].xAxis =this.worthData.nearlymonth;
                this.option.series[0].markPoint.data[2].yAxis =this.worthData.nearlyrate;
                // this.option.series[0].data =this.worthData.rate.split(',');
                this.myChart.setOption(this.option);
            },
            fCallback:(res) => {
                if(res.code==2002){
                    this.$router.push({  
                        path: '/userInfo',
                        query:{pathAddress: '/universalWorth'} 
                    });
                }
            }
        })

    },
    mounted(){
        this.myChart = echarts.init(document.getElementById('main'),'macarons');
        
        // myChart.setOption(option);  
    },
    methods:{
        ...mapActions({
          getUniversalWorth: "getUniversalWorth"
        }),
        toNum(newNum){
            var num = 0;
            var t = setInterval(function(){
                num++;
                let span =decument;
                span.innerText=num;
                if(num=newNum){
                    clearInterval(t)
                }
            })
        },
        toDetial(type){
            console.log(type)
            this.$router.push({ 
                path: '/universalDetial',
                query:{
                    type:type,
                    productId: this.worthData.productId,
                    policyId: this.worthData.policyId,
                    itemId: this.worthData.itemId
                } 
            });
        }
    }
}
</script>

<style scoped>
html,body,p,form,ul,h1,h2,h3,h4,h5,h6{margin:0;padding:0;}
h1,h2,h3,h4,h5,h6{font-weight:normal;font-size:14px;}
body {background: #fff;color: #000;font-family: "微软雅黑","Arial black";;}
.content{margin:0;padding:0;background:'';}
.content_total{background-image:-webkit-gradient(linear,left top,left bottom,from(#f05a38),to(#e61119));;
background:-moz-linear-gradient(top,#f05a38,#e61119);height:120px;padding:20px;}
.content_now{height:60px;padding:20px;}
.title{font-size:2.0em;color:#ffffff;}
.title1{font-size:1.5em;color:#9f9fa9;;}
.title_detail{font-size: 5em; float: left;color:white;}
.title_detail4{font-size: 4em; float: left;color:white;}
.title_detail3{font-size: 3em; float: left;color:white;}
.title_detail1{font-size: 4em; float: left;color:#fd6138;}
.title_detail1{font-size: 3.3em; float: left;color:#fd6138}
.content_shouyi{height: 170px; background-color: #eceeef; padding: 20px;;}
.titleFont{font-size: 0.8em; color:gray}
.border{background:url('../../assets/mgImg/line.png') no-repeat left;background-position:0 50%;padding-left:10px;}
.font1{font-size: 1.2em; float: left; margin-top: 6px;color:#726f83;}
.font2{color:gray;font-size: 1.5em;padding:0 20px;}
.font3{color:gray;font-size: 0.8em;padding:0 20px 20px 20px;}
   /*background: url('../../assets/mgImg/detail_btn.png')     */
</style>