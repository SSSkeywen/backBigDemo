<template>
<!-- 批文信息 -->
<div class="mg-box">
    <headerT :headerContent="headerContent"></headerT>
    <section class="mp-box-one">尊敬的用户，你请求的批文不存在。</section>
    <a class="btn-back" href="javascript:history.back()">返回</a>
</div>
</template>

<script>
import headerT from '../../components/header.vue'
export default {
	data() {
	    return {
	        headerContent: '批文信息',
        }
	},
	components:{
	    headerT
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
.mg-box{
    min-height: 100vh;
    background-color: #DCDCDC;
}
.mp-box-one{
    width: 95%;
    background-color: #fff;
    margin: 10px auto;
    padding: 0.2rem 0.3rem 0.4rem;
    border-radius: 10px;
    box-sizing: border-box;
    line-height: 16px;
    text-align: center;
}  
.btn-back{
    display: block;
    width: 50%;
    height: 30px;
    margin: 0.2rem auto;
    border-radius: 6px;
    background-color: #00ae4d;
    color: #fff;
    line-height: 30px;
    text-align: center;
}  
</style>