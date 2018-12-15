<template>
    <div class="amountButton">
        <div class="amountButton-left">
            <div class="amountButton-icon" :class="{isactive: isactive}" @click="allSelect">
            </div>
            <div class="amountButton-font">
                全选
            </div>
        </div>
        <div class="amountButton-right" @click="changeBtn">
            选择变更
        </div>   
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isactive: false
            }
        },
        methods: {
            changeBtn(){
                this.$emit('changeBtn')
            },
            allSelect(){
                this.isactive = !this.isactive
                this.$emit('allSelect', this.isactive)
            }
        },
        watch:{
          controlchangeBtn(val){
            this.isactive = val
          }
        },
        created(){
            this.isactive = this.controlchangeBtn
        },
        props:['controlchangeBtn']
    }
</script>

<style lang="scss" scoped>
    .amountButton{
        height: 0.97rem;
        background: #fff;
        padding-left: 0.15rem;
        line-height: 0.97rem;
        display: flex;
        position: fixed;
        width: 100%;
        bottom: 0;
        .isactive{
            background-image: url('../../assets/reduceAmount/checked.png');
            background-size: cover;
        }
        .amountButton-icon{
            width: 0.4rem;
            height: 0.4rem;
            border: 0.01rem solid #c9c9c9;
            border-radius: 0.1rem;
            margin-right: 0.3rem;
        }
        .amountButton-font{
            font-size: 0.3rem;
            color: #606060;
        }
       .amountButton-left{
            display: flex;
            align-items: center;
            width: 40%;
        }
        .amountButton-right{
            background: #4dab57;
            color: #fff;
            width: 60%;
            text-align: center;
            font-size: 0.34rem;
        }
    }
</style>