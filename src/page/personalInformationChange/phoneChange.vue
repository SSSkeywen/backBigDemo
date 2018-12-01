<template>
  <div class="change-bg">
    <headerT :headerContent="headerContent"></headerT>
    <div v-if="false">
      <ul class="cp-ul">
        <li>
          <p>手机号码</p>
          <div>
            <input type="tel">
          </div>
        </li>
      </ul>
      <btnComponent :btnCount="btnCount"></btnComponent>
    </div>
    <div v-else>
        <notToOpenComponent :tipsContent="tipsContent"></notToOpenComponent>
        <btnComponent :btnCount="'知道了'" @IKnow="IKnow"></btnComponent>
    </div>
  </div>
</template>

<script>
import headerT from "../../components/header.vue";
import btnComponent from "../../components/btnComponent.vue";
import notToOpenComponent from "../../components/notToOpenComponent.vue";
export default {
  data() {
    return {
      headerContent: "联系手机变更",
      btnCount: "确认变更",
      tipsContent:"为保障服务安全，系统已优化升级，请至公司柜面或微信首页开设保险服务密码"
    };
  },
  components: {
    headerT,
    btnComponent,
    notToOpenComponent
  },
  methods: {
      IKnow() {
          console.log(11)
          this.$router.go(-1)
      }
  },
};
</script>

<style lang="scss" scoped>
.cp-ul {
  padding-left: 0.2rem;
  background-color: #fff;
  margin-top: 0.4rem;
  li {
    display: flex;
    line-height: 0.9rem;
    font-size: 0.32rem;
    p {
      flex: 0.3;
    }
    div {
      flex: 0.7;
      padding: 0.1rem 0;
      box-sizing: border-box;
      height: 0.9rem;
      input {
        width: 100%;
        line-height: 0.7rem;
        display: block;
      }
    }
  }
}
</style>