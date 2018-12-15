<template>
  <div>
    <div id="box" class="box">
      <div id="content" class="content_one">
        <div id="content_top" class="content_one_top clearfix">
          <div class="content_one_topL">
            <span>保单号：{{contentData.policyCode}}</span>
            <input type="hidden" name="policyCode" id="180208132332306">
          </div>
        </div>
        <div class="content_one_xia">
          <ul>
            <li>
              <div>
                <span>被保人:</span>
                <span>{{contentData.insurantName}}</span>
              </div>
            </li>
            <li>
              <div>
                <span>保单状态:</span>
                <span>{{contentData.liabilityState}}</span>
              </div>
            </li>
            <li>
              <div>
                <span>信件类型:</span>
                <span>{{contentData.noticeType}}</span>
                <input type="hidden" name="noticeType" id="转账成功通知书">
              </div>
            </li>
            <li>
              <div>
                <span>当前报告发送方式为:</span>
                <span>{{contentData.paperNotice}}</span>
              </div>
            </li>
            <li style="border: none;">
              <div>
                <span>变更报告发送方式为:</span>
              </div>
            </li>
            <li class="btns">
              <button @click="changSendStyleFn(1,contentData.policyCode,contentData.noticeType)">短信告知</button>
              <button @click="changSendStyleFn(2,contentData.policyCode,contentData.noticeType)">电子邮箱</button>
              <button @click="changSendStyleFn(3,contentData.policyCode,contentData.noticeType)">自助查询</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['contentData'],
    methods: {
        changSendStyleFn(num,policyCode,noticeType) {
            this.$emit('viewElectronicInvoices',num,policyCode,noticeType)
        }
    },
};
</script>

<style scoped>
.box {
    width: 100%;
    position: relative;
}
.box .content_one {
    width: 95%;
    margin: 10px auto;
    border: 1px solid #DCDCDC;
    background-color: #fff;
    border-radius: 10px;
}
.box .content_one .content_one_top {
    width: 100%;
    background-color: #00AE4F;
    line-height: 26px;
    border-radius: 10px 10px 0 0;
    position: relative;
}
.box .content_one .content_one_top .content_one_topL {
    width: 92%;
    margin: 0 auto;
    color: #FFFFFF;
}
.content_one_xia ul {
    margin-top: 5px;
    margin-bottom: 10px;
}
.content_one_xia ul li {
    width: 92%;
    line-height: 26px;
    margin: 0 auto;
    border-bottom: 1px solid #d1d2d2;
}
.content_one_xia ul li>div {
    display: flex;
    justify-content: space-between;
}
.btns {
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
    border: none!important;
}
.btns button {
    background: #00AE4F;
    color: #fff;
    border: none;
    width: 25%;
    line-height: 30px;
    margin-top: 5px;
    border-radius: 5px;
    font-size: 14px;
}
</style>