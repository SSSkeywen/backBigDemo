<template>
    <div class='smallButton' @click="btnControl">{{btnText}}</div>
</template>

<script>
export default {
  name: "smallButton",
  props:['btnText'],
  methods: {
      btnControl(){
          this.$emit("btnControls")
      }
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.smallButton{
    width: 3.75rem;
    height: 0.71rem;
    text-align: center;
    background-color: #00ae4d;
    font-size: 0.3rem;
    color: #fff;
    line-height: 0.71rem;
    border-radius: 0.1rem;
}

</style>