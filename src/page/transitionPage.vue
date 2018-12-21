<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
import { config } from "@/config/config.js";
export default {
  created() {
    let goBack = window.localStorage.getItem("goBack");

    if (goBack == 1) {
      let data = this.$route.query.sign;
      this.towtdecoder({
        data,
        successCallback: res => {
          window.localStorage.setItem("goBack", "0");
          if (res == 2) {
            this.$router.push({
              path: window.localStorage.getItem("pathAddress")
            });
          } else {
            this.$router.push({ path: "/businessHanding" });
          }
        },
        failCallback: res => {}
      });
    } else {
      history.back(-1);
    }
  },
  methods: {
    ...mapActions({
      towtdecoder: "towtdecoder"
    })
  }
};
</script>

<style scoped>
</style>