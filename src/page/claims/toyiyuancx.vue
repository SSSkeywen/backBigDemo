<template>
    <div class="yy-box">
        <headerT :headerContent="headerContent"></headerT>
        <section v-show="isShowMsg">
            <div class="yy-select">
                <ul class="yy-ul">
                    <li class="yy-li">
                        <p class="yy-select-title">请选择省份：</p>
                        <select name="" id="">
                            <option value="1">上海</option>
                        </select>
                    </li>
                    <li class="yy-li">
                        <p class="yy-select-title">请选择城市：</p>
                        <select name="" id="">
                            <option value="1">上海</option>
                        </select>
                    </li>
                    <li class="yy-li">
                        <p class="yy-select-title">请输入医院名称：</p>
                        <input type="text">
                    </li>
                </ul>
            </div>
            <div class="yy_cx">
                <button @click="queryFn">开始查询</button>
            </div>
        </section>
        <section v-show="!isShowMsg">
            <div class="yy-select">
                <ul class="yy-ul">
                    <li class="yy-xx-li" v-for="(item,index) in yyList" :key="index">
                        <p>{{item.name}}</p>
                        <p>{{item.dengji}}</p>
                    </li>
                </ul>
            </div>
            <div class="yy_cx">
                <button @click="queryFn">返回</button>
            </div>
        </section>
    </div>
</template>

<script>
import headerT from "../../components/header.vue";
import { mapActions } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    headerT
  },
  data() {
    return {
      headerContent: "医院信息",
      isShowMsg:true,
      yyList:[
          {
              name:'重庆医科大学附属第一医院',
              dengji:'三级'
          }
      ]
    };
  },
  methods: {
      queryFn() {
          this.isShowMsg = !this.isShowMsg
      }
  },
};
</script>

<style lang="scss" scoped>
.yy-box {
  height: 100vh;
  background-color: #dcdcdc;
  .yy-select {
    width: 95%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding-bottom: 10px;
    .yy-ul {
      width: 90%;
      margin: 0 auto;
      padding-top: 1%;
      padding-bottom: 1%;
      .yy-li {
        width: 100%;
        line-height: 0.52rem;
        margin: 5px 0;
        select,
        input {
          width: 95%;
          height: 0.52rem;
          line-height: 0.36rem;
          border-radius: 7px;
          padding-left: 0.1rem;
          border: 1px solid #999;
        }
      }
      .yy-xx-li{
        border-bottom: 1px solid #7B7B7B;
        width: 100%;
        line-height: 0.52rem;
        margin: 5px 0;
        p:last-child{
            font-size: 0.24rem;
            height: 0.52rem;
            line-height: 0.36rem;
            color: #7B7B7B;
        }
      }
    }
  }

  .yy_cx {
    width: 50%;
    margin: 0 auto;
    button {
      width: 100%;
      height: 0.7rem;
      background-color: #00ae4d;
      color: #fff;
      border: none;
      border-radius: 7px;
    }
  }
}
</style>