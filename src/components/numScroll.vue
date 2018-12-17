<template>
<div class="number-grow-warp">
<span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
</div>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 0.3
    },
    value: {
      type: Number,
      default: 1000
    }
  },
  methods: {
    numberGrow (ele) {
      let _this = this
      var is0=false;
      if(_this.value==0){
        _this.value+=100
        is0=true;
      }
      _this.value=_this.value.toFixed(2);
      let step = Math.floor((_this.value * 10) / (_this.time * 1000))
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start > _this.value) {
          clearInterval(t)
          start = _this.value
          t = null
          if(is0){
            ele.innerHTML = '0.00';
            return;
          }
        }
        if (current === start) {
          return
        }
        current = start
        // ele.innerHTML = current
        ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+\b)/g, '$1,');
        
      }, 10)
      
    }
  },
  mounted () {
    this.numberGrow(this.$refs.numberGrow)
    console.log()
  }
}
</script>

<style>
.number-grow-warp{
  transform: translateZ(0);
}
.number-grow {
  display: block;
  width:100%;
  overflow: hidden;
}
</style>