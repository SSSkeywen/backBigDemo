<template >
  <div style="background-color: #dcdcdc;    min-height: 100vh;">
    <div class="header">医院列表</div>
    <section class="xx_lb bg_dj" style="border-radius:0;">
      <div class="xx_lb_nr">
        <div id="xx_lb" class="yy_xx xx_lb_b">
          <ul class="clearfix">
            <li
              style="border-bottom: 1px solid #7B7B7B!important;"
              v-for="(hospitalsItem,hospitalsIndex) in hospitalsList"
              :key="hospitalsIndex"
            >
              <div class="yy_sf">
                <span v-text="hospitalsItem.hospitalsName"></span>
              </div>
              <div
                class="yy_sf_nr"
                style="font-size: 12px;height: 26px;line-height: 18px;color: #7B7B7B;"
                v-text="hospitalsItem.hospitalsDegra"
              ></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section style="width: 100%;">
      <button class="rt_btn" style  @click="Back()">返回</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hospitalsList: [
        { hospitalsName: "复旦大学华山附属医院", hospitalsDegra: "三甲医院" },
        {
          hospitalsName: "上海交通大学医院附属济仁医院（西部）",
          hospitalsDegra: "三甲医院"
        }
      ]
    };
  },
  methods:{
    //返回
    Back(){
       this.$router.push({ path: "/xzyiyuan" });
       console.log("返回")
    }
  },
};
</script>

<style scoped>
#app {
  background-color: #dcdcdc;
}
.header {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #006cb7;
  text-align: center;
  font-size: 0.36rem;
  color: #fff;
}
.bg_dj {
  border-radius: 10px;
  padding-bottom: 10px;
}
.xx_lb {
  width: 95%;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.xx_lb .xx_lb_nr {
  width: 90%;
  margin: 0 auto;
  padding-top: 1%;
  padding-bottom: 1%;
}
.xx_lb .xx_lb_nr .xx_lb_b {
  width: 100%;
}
.xx_lb .xx_lb_nr .xx_lb_b > ul > li {
  width: 100%;
  line-height: 0.6rem;
  border-bottom: 1px solid #d1d2d2;
}
.yy_xx ul li {
  border: none !important;
  margin: 5px 0;
}
.rt_btn {
  width: 50%;
  margin: 10px auto;
  height: 35px;
  background-color: #00ae4d;
  display: block;
  border: none;
  color: #fff;
  border-radius: 7px;
}
</style>
