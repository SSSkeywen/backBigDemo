<template>
    <div class="mg-box">
        <!-- 投保进程查询 -->
        <headerT :headerContent="headerContent"></headerT>
        <ul class="tabBox">
            <li class="liSelf" :class="{current: ok}" @click="tog(1)">本人保单状态查询</li>
            <li class="liClient" :class="{current: !ok}" @click="tog(2)">客户保单状态查询</li>
        </ul>
        <div class="downBox" v-if="myaddData.length!=0">
            <div class="libox" v-show="ok">
                <div v-for="(item,index) in myaddData" :key="index">
                  <progressInfo :myaddData="item"></progressInfo>
                </div>
            </div>
            <div class="libox" v-show="!ok">
                <section class="searchBox">
                    <table>
                        <tr>
                            <td>投保单号</td>
                            <td><input name="codeNum" type="text" placeholder="请输入投保单号"></td>
                       </tr>
                       <tr> 
                            <td>身份证号</td>
                            <td><input name="IDNum" type="text" placeholder="请输入身份证号码"></td>
                        </tr>
                    </table>
                    <input class="btn_search" type="button" value="查询" />
                </section>
                <!-- <div v-for="(item,index) in myaddData" :key="index">
                  <progressInfo :myaddData="item"></progressInfo>
                </div> -->
            </div>
        </div>
        <div v-else class="downBox">该客户名下暂无60内承包的保单</div>
        <footer id="banquan" class="banquan" style="position: fixed; bottom: 0; z-index:9">
            <span>版权所有&nbsp;©&nbsp;2001-2016&nbsp;中国太平保险集团有限责任公司</span>
        </footer>
    </div>
</template>

<script>
import headerT from '../../../components/header.vue'
import progressInfo from '../../../components/liufeitao/progressInfo.vue'
export default {
    data() {
	    return {
	        headerContent: '全部保单列表',
            ok: true,
            myaddData:[
                {
                    insureCode:'000000017808995',
                    zhuxianName:'太平个人太平个人太平个人太平个人B款',
                    currentStatus:'回访成功',
                    steps:{
                       step0:{
                          stepText:'投保单已提交',
                          stepDate:'2016-02-02'
                       },
                       step1:{
                          stepText:'付款成功',
                          stepDate:'2016-02-03'
                       },
                       step2:{
                          stepText:'你的保单已打印，寄送中！',
                          stepDate:'2016-02-04'
                       },
                       step3:{
                          stepText:'保单已寄送',
                          stepDate:'2016-02-05'
                       },
                       step4:{
                          stepText:'保单已签收',
                          stepDate:'2016-02-06'
                       },
                       step5:{
                          stepText:'回访成功',
                          stepDate:'2016-02-07'
                       } 
                    }
                }
            ]
        }
	},
	components:{
	    headerT,
        progressInfo
	},
	methods: {
        tog(str){
            // tab切换
            str==2?this.ok=false:this.ok=true;
        } 
	}
}
</script>

<style lang="" scoped>
.banquan{
    width: 100%;
    height: 45px;
    margin-top: 8%;
    line-height: 45px;
    background-color: #F0F0F0;
    color: #949494;
    font-size: 12px;
    text-align: center;
}
.mg-box{ 
    min-height: 100vh;
    background-color: #dcdcdc;  
}
.downBox{
    width:100%;
    margin: 20px auto;
}
.tabBox{
    display: flex;
    width: 100%;
    height: 40px;
}
.tabBox li{
    flex: 1;
    height: 100%;
    background-color: #bcbcbc;
    line-height: 40px;
    text-align: center;
    color: #fff;
}
.tabBox li.current{background-color: #00ae4d;}
.libox:nth-child(1){width: 88%; margin:auto;}
.searchBox table{
    table-layout:fixed;
    width: 100%;
    background-color: #fff;
    border: 0;
}
.searchBox table tr{
    display: flex;
    line-height: .6rem;
}
.searchBox table td{
    flex:1;
    padding-right: 5px;
}
.searchBox table td:nth-child(1){
    padding-left: 10px;
    flex: 0 0 80px;
}
.searchBox table td input{
    appearance: none;
    outline:none;
    display: block;
    border: 1px solid #999;
    width: 100%;
    box-sizing: border-box;
}
.btn_search{
    appearance: none;
    display: block;
    width: 90%;
    height: 40px;
    border-radius:8px;
    margin: 20px auto;
    background-color: #00ae4d;
    text-align: center;
    line-height: 40px;
    color: #fff;
}
</style>
