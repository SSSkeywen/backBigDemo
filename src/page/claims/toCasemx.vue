<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <ul>
            <li>
              <caseMsg></caseMsg>  
            </li>
        </ul>
        
    </div>
</template>

<script>
import headerT from '../../components/header.vue'
import caseMsg from '../../components/claimsComponent/caseMsg.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
    export default {
        components:{
            headerT,
            caseMsg
        },
        data() {
            return {
                headerContent: '案件进度'
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