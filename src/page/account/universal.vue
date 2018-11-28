<template>
<div class="mg-box">
	<headerT :headerContent="headerContent"></headerT>
	<div style="width: 100%;height: 10px;"></div>
	<section class="sq clearfix" v-for="(item,index) in accountType" :key="index">
	  <div class="sq_xz">
			<ul>
				<li>
					<div class="sq_mc">
						<span>{{item.typeName}}</span>
					</div>
					<div class="sq_nr" @click="jumpUrl(item.typeUrl)">
						<div id="" style="width: 100%;">
						<i><img :src="imgSrc" style="width: 50%;"></i>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</section>
</div>
</template>


<script>
import headerT from '../../components/header.vue'
export default {
data() {
        return {
            headerContent: '万能账户',
            imgSrc: require('@/assets/mgImg/icon-arrow-right.png'),
            accountType:[
            	{
            		typeName:'金账户',
            		typeUrl:'/'
            	},{
                	typeName:'财富金账户',
                	typeUrl:''
                },{
                	typeName:'财富金账户（个险）',
                	typeUrl:''
                },{
                	typeName:'财富金账户（银险）',
                	typeUrl:''
                },{
                	typeName:'幸福金账户',
                	typeUrl:''
                },{
                	typeName:'财富砖账户',
                	typeUrl:''
                },{
                	typeName:'砖石账户',
                	typeUrl:''
                },{
                	typeName:'云账户',
                	typeUrl:''
                },{
                	typeName:'盈账户',
                	typeUrl:''
            }]
        }
    },
    components:{
    	headerT
    },
    methods: {
    	jumpUrl(url) {
    			console.log(url);
                this.$router.push({ path: '' });
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