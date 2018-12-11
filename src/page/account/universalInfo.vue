<template>
<div class="content">
	<div class="bd_tt">
	全部保单信息
	</div> 
	<div class="libox" v-if="universalInfo!=''&&universalInfo!=null">
           <div class="bdhflb" v-for="(item, index) in universalInfo" :key="index">
                <div class="bdhf_tt">
                    保单号码：{{item.policyCode}}
                </div>
            <div class="bdhf_cont" >
                <div class="bdhf_cont_right">
                    <label>
                        <input type="button" class="detail_btn"  @click="toWorth(index)">
                    </label>
                </div>
                <div class="bdhf_cont_left">
                    <p class="bdhf_lpdate">
                        投保人姓名：<span>{{item.applicantName}}</span>
                    </p>
                    <p class="bdhf_lpdate">
                        生效日期：<span>{{item.validateDate}}</span>
                    </p>
                    <p class="bdhf_lpdate">
                        第一主险名称：<span>{{item.productName}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
	<div class="bdhflb" v-else>
	     <div class="bdhf_cont">
	         <div class="bdhf_cont_left" style="width:100%;">
	            <p class="bdhf_lptt">目前没有财富金账户（个险）的保单。
	            </p>
	         </div>
	     </div>
	 </div>
</div>
</template>


<script>
export default {
    data() {
        return {
            infoIndex:'',
            universalInfo:[]
        }
    },
    created(){
        // this.infoIndex= this.$route.query.myIndex;
        let localData = JSON.parse(window.localStorage.getItem('localData'));
        this.universalInfo = localData;
        // console.log('-----------')
        // console.log(this.universalInfo)
    },
    methods:{
        toWorth(index){
            this.$router.push({ 
                path: '/universalWorth',
                query:{
                    productId: this.universalInfo[index].productId,
                    policyId: this.universalInfo[index].policyId,
                    itemId: this.universalInfo[index].itemId
                }
            });
        }
    }
}
</script>

<style scoped>
body {
    background: #ebebeb;
    color: #000;
    font-family: "微软雅黑";
}
.content {padding: 20px 10px 30px;}
.bd_tt {
    text-align: center;
    font-size: 22px;
    padding: 0 0 20px;
}
.bdhflb {
    margin-bottom: 20px;
    overflow: hidden;
    background: #FFF;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.4);
}

.bdhf_tt {
    padding: 10px 10px;
    color: #FFF;
    font-size: 20px;
    background: #00ac0c;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0,0.3);
}
.bdhf_cont {
    padding: 25px 15px;
    overflow: hidden;
}
.bdhf_cont_right {
    width: 30%;
    margin-left: 2%;
    float: right;
}
.bdhf_cont_left {
    width: 68%;
    float: left;
}
.detail_btn {
    float: right;
    cursor: pointer;
    margin-top: 3px;
    background: url('../../assets/mgImg/detail_btn.png') right center no-repeat;
    height: 54px;
    border: 0;
    width: 54px;
}
.bdhf_lpdate {
    padding-top: 10px;
    font-size: 16px;
    color: #808080;
}
.bdhf_lpdate span, .qbbdhf_lb span, .qbbdhf_litop span { color: #00ac0c;}
.bdhf_lptt { font-size: 21px;}
</style>