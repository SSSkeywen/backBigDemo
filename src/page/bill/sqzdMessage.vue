<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <information></information>
        
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import information from '../../components/billComponent/information.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
    export default {
        components:{
            headerT,
            information
        },
        data() {
            return {
                headerContent: '首期账单查询'
            }
        },
    }
</script>

<style lang="scss" scoped>
.casemx-box{
    min-height: 100vh;
    background: #DCDCDC;
}
</style>