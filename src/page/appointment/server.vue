<template>
<div class="mg-box">
	<headerT :headerContent="headerContent"></headerT>
	<div class="mask" v-show="mask"></div>
	<div style="position:absolute;width: 100%;height:100%;left:0;top:0;background: #f8f8f8;"  id="yyxmList">
		<div class="list-content" >
			<div class="list-box" @click="showMask(index)" v-for="(item, index) in datalist" :key="index">
				<div class="list-box-left">
				{{item.proname}}
				</div>
				<div class="list-box-right">
					<img  src="@/assets/appointment/arrow.png"/>
				</div>
			</div>
			
		</div>
		<div class="list-btn">
			<div class="list-btn-left" @click="back">
				返回
			</div>
			<div class="list-btn-right" @click="back('sure')">
				确定
			</div>
		</div>
	</div>
	<div class="control-box" v-show="mask">
		<div class="box-top">
		 <span @click="cancel">取消</span>
		 <span @click="sure">确认</span>
		</div>
		<div class="selec-box">
			<div class="selec-box-list" v-for="(item, index) in datalist[myindex].children" :key="index" @click="selectItem(index)" :class="{changeColor: item.selectColor}">
			{{item.proname}}
			</div>
		</div>
	</div>
</div>
</template>
<script>
import { mapActions } from "vuex";
import headerT from "@/components/header.vue";
import { Toast } from "vant";
export default {
	data(){
		return{
			datalist: [],
			myindex: 0,
			headerContent: "选择服务项目",
			mask: false,
		}
	},
	methods: {
		selectItem(i){
			let data = this.datalist[this.myindex]
			data.children[i].selectColor = !data.children[i].selectColor
			this.$set(this.datalist, this.myindex, data)
			console.log("this.datalist", this.datalist)
                
		},
		...mapActions({
             listprojects: 'listprojects'
        }),
		cancel(){
			this.mask =false
		},
		sure(){
			this.mask =false
		},
		showMask(i){
			this.mask = true
		    this.myindex = i
		},
		back(i){
			if(i == 'sure'){
				let arr = []
				this.datalist.forEach((item) => {
					item.children.forEach((it) => {
						if(it.selectColor){
							let obj = {
								id: it.proid,
								name: it.proname
							}
							arr.push(obj)
						}
					})
				})
				console.log("arr", arr)
				this.$router.push({path: '/appointmentForm', query:{'siteId': this.$route.query.siteId, project: JSON.stringify(arr)}})
			} else {
				this.$router.push({path: '/appointmentForm'})
			}
		}
	},
	mounted() {
		this.listprojects({
            successCallback: res => {
				this.datalist = res.data
				this.datalist.forEach((item) => {
					item.children.forEach((it) => {
						it.selectColor = false
					})
				})
				console.log('this.datalist',this.datalist)


            },
            failCallback: res => {
                    Toast({
                        message: res.msg,
                        duration: 3000
                    });
            }
        });
	},
	components: {
		 headerT
	 },
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
.changeColor{
	color: red !important;
}
.mask{
    position: absolute;
    background: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
}
.list-content{
	border-bottom: 0.01rem solid #e0e0e0;
	margin-bottom: 0.2rem;
	background: #fff;
}
.list-box{
    height: 0.88rem;
    display: flex;
    margin: 0 0.3rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.01rem solid #e0e0e0;
}
.list-box:last-child{
	border: 0;
}
.list-btn{
    display: flex;
    padding: 0 0.3rem;
    justify-content: space-between;
    div{
    	width: 2.98rem;
	    height: 0.7rem;
	    background: #55b047;
	    color: #fff;
	    font-size: 0.26rem;
	    text-align: center;
	    line-height: 0.7rem;
	    border-radius: 0.05rem;
    }
}
.selec-box {
	padding: 0 0.2rem;
	display: flex;
            flex-wrap: wrap;
	.selec-box-list{
		    padding: 0.2rem;
		    color: #262626;
		    font-size: 0.28rem;
		    border: 0.01rem solid #262626;
		    border-radius: 0.7rem;
		    margin-right: 0.2rem;
		     margin-top: 0.2rem;
	}
}
.control-box{
	    height: 7.36rem;
	    background: #fff;
	    position: absolute;
	    bottom: 0;
	    width: 100%;
	    z-index: 2;
	.box-top{
		    padding: 0 0.2rem;
		    height: 0.8rem;
		    border-bottom: 0.01rem solid #e7e7e7;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    font-size: 0.26rem;
	}
}
</style>