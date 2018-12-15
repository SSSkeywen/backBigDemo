<template>
    <div class="new-alert">
        <div class="con_tk" style="display: block;    padding: 10px 0;">
        <span style="font-size: 18px;font-weight: bold;margin: 0px 0 10px 0;display: block;">提示信息</span>
        <p><img :src="tipsIconSrc" id="img" style="height:50px;width:50px;margin:0 auto;"></p>
        <p class="tsxx" style="font-size: 16px;margin: 0px auto;text-align: center;">邮件已发送，请注意查收！</p>
        <button @click="closeWindow" id="closeChange" style="width:70%;background-color: #4B9FF0;height: 35px;border: none;border-radius: 7px;color:#fff;font-size:16px;">
        	回到首页
        </button>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tipsIconSrc: require('@/assets/billImg/xl.png')
            }
        },
        methods: {
            closeWindow() {
                this.$emit('clsoeTips')
            }
        },
    }
</script>

<style scoped>
.new-alert{
        height: 100%;
    width: 100%;
    background: rgba(51, 86, 105, 0.8);
    z-index: 108;
    position: fixed;
    top: 0px;
}
.con_tk {
    background: #dedede;
    z-index: 110;
    position: fixed;
    width: 90%;
    top: 50%;
    left: 50%;
    background: #fff;
    margin-left: -45%;
    margin-top: -75px;
    border-radius: 7px;
    text-align: center;
}
.con_tk p {
    line-height: 24px;
    text-align: center;
    color: #a5a5a5;
    padding: 15px 0px;
    width: 100%;
}
</style>