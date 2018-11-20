<template>
    <div>
        <div class="yy-select">
            <ul class="yy-ul">
                <li class="yy-xx-li" v-for="(item,index) in hospitalListData" :key="index">
                    <p>{{item.hospitalName}}</p>
                    <p>{{item.hospitalClassName}}</p>
                </li>
            </ul>
        </div>
        <div class="yy_cx">
            <button @click="bankFn">返回</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      yyList: [
        {
          name: "重庆医科大学附属第一医院",
          dengji: "三级"
        }
      ]
    };
  },
  props:['hospitalListData'],
  methods: {
      bankFn() {
          this.$emit('closeHospitalList')
      }
  },
};
</script>

<style lang="scss" scoped>
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
    .yy-xx-li {
      border-bottom: 1px solid #7b7b7b;
      width: 100%;
      line-height: 0.52rem;
      margin: 5px 0;
      p:last-child {
        font-size: 0.24rem;
        height: 0.52rem;
        line-height: 0.36rem;
        color: #7b7b7b;
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
</style>