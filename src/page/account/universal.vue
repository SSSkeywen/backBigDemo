<template>
<div class="mg-box">
	<headerT :headerContent="headerContent"></headerT>
    <div v-if="this.universalList.length!=0">
    	<div style="width: 100%;height: 10px;"></div>
    	<section class="sq clearfix" v-for="(item,index) in universalList" :key="index">
    	  <div class="sq_xz">
    			<ul>
    				<li  @click="jumpUrl(index)">
    					<div class="sq_mc">
    						<span>{{item.productNameAbb}}</span>
    					</div>
    					<div class="sq_nr">
    						<div id="" style="width: 100%;">
    						<i><img :src="imgSrc" style="width: 50%;"></i>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</div>
    	</section>
    </div>
    <nothing v-else :tipsContent="tipsContent"></nothing>
</div>
</template>


<script>
import headerT from '../../components/header.vue';
import nothing from '../../components/nothing.vue';
import { mapActions } from "vuex";
export default {
data() {
        return {
            headerContent: '万能账户',
            imgSrc: require('@/assets/mgImg/icon-arrow-right.png'),
            tipsContent: '目前没有万能账户保单。',
            universalList:[]
        }
    },
    created() {
		console.log('Ajax 开始');
        this.getUniversalList({
          successCallback: res => {
			console.log(res.data);
			this.universalList=res.data;
          },
          fCallback: res => {}
        });
    },
    components:{
    	headerT,
        nothing
    },
    methods: {
        ...mapActions({
		  getUniversalList: "getUniversalList",
		  getUniversalUrl: 'getUniversalUrl'
        }),
    	jumpUrl(index) {
			let typeData = this.universalList[index].productId
			this.getUniversalUrl({
				typeData,
				successCallback: res => {
					// 判断获取的数据长度  如果一个以上 正常跳转到universalInfo
					if(res.data.length>1){
						window.localStorage.setItem('localData', JSON.stringify(res.data))
						this.$router.push({ 
						    path: '/universalInfo'
						});
					}else{ // 判断获取的数据长度  如果一个 跳到universalWorth
						this.$router.push({ 
							path: '/universalWorth',
							query:{
								productId: res.data[index].productId,
								policyId: res.data[index].policyId,
								itemId: res.data[index].itemId
							}
						});
					}
				},
				fCallback: res => {}
				});

            // this.$router.push({ 
            //     path: '/universalInfo',
            //     query:{
            //         myIndex: index
            //     }
			// });
        }
    }
}
</script>

<style scoped>
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
}
.sex{
	display: flex;
	display: -webkit-flex;
	display: -moz-flex;
	display: -ms-flex;
	width: 30%;
}
.sex b{
	width: 35%;
	height: 40px;
	background: no-repeat center center;
	/*background-image: url(img/iconxz_05.png);*/
	background-size: 100%;
}
.sq{
  width: 100%;
  background-color: #fff;
}
.sq .sq_xz{
	width: 97%;
	float: right;
	line-height: 40px;
}
.sq_mc{width: 75%!important;}
.sq .sq_xz ul li .sq_nr{width: 20%;}
.sq .sq_xz ul li .sq_nr i img{margin-bottom: 5px;}
.sq .sq_xz ul li{
	border-bottom: 1px solid #EFEFF4;
    display: -webkit-flex;
    display: flex;
	justify-content: space-between;
}
.sq{ margin-bottom: 10px; }
.sq_nr div{position: relative;}
.sq_nr div i{
	position: absolute;
	top: 0;
	right: 2%;
}
.sq img{display: inline-block;}
</style>