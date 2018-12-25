<template>
	<div class="me-box">
		<section>
            <img src="@/assets/appointment/content.jpg" width="100%">
        </section>
        <div class="btn-box"style="
            display: flex;
            padding:  0 0.38rem;
            justify-content: space-between;
            margin-top: 1.02rem;
        ">
            <div class="btn-one" @click="addressBtn">
                <a href="javascript:void(0)" id="sxy"><img src="@/assets/appointment/btnOne.png"></a>
            </div>
            <div class="btn-one">
                <a href="javascript:void(0)" id="rrv"><img src="@/assets/appointment/btnTwo.png"></a>
            </div>
        </div>
        <footer class="footer-img">
            <img src="@/assets/appointment/footer.jpg" width="100%">
        </footer>
	</div>
</template>

<script>
import headerT from '@/components/header.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
    export default {
        data() {
            return {
				
            }
        },
        components:{
            headerT
        },
        mounted(){
			
        },
        methods:{
			addressBtn(){
                this.$router.push({path: '/addressIndex'})
            }
        }
    }
</script>

<style lang="scss" scoped>
.me-box {
  background-color: #f2fdf7;
  min-height:100vh;
}
btn-box{
    width: 10rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding: 1.3rem 0.5rem 0;
    box-sizing: border-box;
}
.btn-one{
    width: 3.15rem;
    height: 1.57rem;
    text-align: center;
}
.btn-one img{
    width: 100%;
}
.footer-img{
    position: absolute;
    bottom: 0;
    left: 0;
}

</style>