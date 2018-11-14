<template>
    <div class="casemx-box">
        <headerT :headerContent="headerContent"></headerT>
        <ul class="casemx-ul">
            <li v-for="(item,index) in contentListData" :key="index" @click="policyMessage(item.policyCode)">
                <toNewComponent :contentListData="item"></toNewComponent>
            </li>
        </ul>
    </div>
</template>

<script>
import headerT from "../../components/header.vue";
import toNewComponent from "../../components/billComponent/toNewComponent.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT,
    toNewComponent
  },
  data() {
    return {
      headerContent: "续期账单查询",
      contentListData: [
        {
          policyCode: "003158178991008",
          productName:'太平爱爸妈骨折综合意外伤害保险',
          policyMoney: "5000",
          insuredName: "",
          validateDate: null,
          statusName: "有效"
        }
      ]
    };
  },
  methods: {
      policyMessage(policyCode) {
            this.$router.push({ path: '/toNewIndexMessage',query: {policyCode: policyCode} });
        },
  },
};
</script>

<style lang="scss" scoped>
.casemx-box {
  min-height: 100vh;
  background: #dcdcdc;
  .casemx-ul {
    li {
      width: 98%;
      margin: 10px auto 12px;
      border-radius: 10px;
      background-color: #fff;
      overflow: hidden;
    }
  }
}
</style>