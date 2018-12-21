<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import url("../static/css/rest.css");
body {
  font-size: 0.28rem;
}
#app {
  min-height: 100%;
}
img {
  display: block;
}
/* 默认一些样式 */
.line {
  position: relative;
}
.line::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #dddddd;
  color: #dddddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.line-new {
  position: relative;
}
.line-new::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #dddddd;
  color: #dddddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.line-green {
  position: relative;
}
.line-green::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #5fb7ba;
  color: #5fb7ba;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.line-down {
  position: relative;
}
.line-down::before {
  content: " ";
  position: absolute;
  left: 0;
  bottom: -2px;
  right: 0;
  height: 1px;
  border-top: 1px solid #f0f0f0;
  color: #f0f0f0;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.line-right {
  position: relative;
}
.line-right::before {
  content: " ";
  position: absolute;
  top: 0;
  right: -1px;
  width: 1px;
  border-right: 1px solid #dddddd;
  color: #dddddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
  z-index: 2;
  height: 100%;
}
.line-left {
  position: relative;
}
.line-left::before {
  content: " ";
  position: absolute;
  top: 0.16rem;
  left: 0.16rem;
  width: 1px;
  border-right: 1px solid #dddddd;
  color: #dddddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
  z-index: 2;
  height: 100%;
}
.line-left-two {
  position: relative;
}
.line-left-two::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0.16rem;
  width: 1px;
  border-right: 1px solid #dddddd;
  color: #dddddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
  z-index: 2;
  height: 0.56rem;
}
.line-down-two {
  position: relative;
}
.line-down-two::before {
  content: " ";
  position: absolute;
  left: 0.3rem;
  bottom: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #dddddd;
  color: #dddddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.style-click {
  position: relative;
  overflow: hidden;
}
.style-click::after {
  content: " ";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0;
}
.style-click:active::after {
  opacity: 0.2;
}

/* swiper样式修改 */
.van-swipe__indicators {
  bottom: 4px !important;
}
.van-swipe__indicator {
  border-radius: 3px!important;
  background-color: #fff!important;
  width: 0.1rem!important;
  height: 0.06rem!important;
}
.van-swipe__indicator--active {
  background-color: #006cb7!important;
  width: 0.18rem!important;
}

/* 变更页面背景样式 */
.change-bg {
  min-height: 100vh;
  background-color: #EFEFF4;
}


.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}


</style>
