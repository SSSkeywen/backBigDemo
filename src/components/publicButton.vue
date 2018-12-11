<template>
    <div class='publicButton' @click="btnControl">{{btnText}}</div>
</template>

<script>
export default {
  name: "publicButton",
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
.publicButton{
    width: 6.9rem;
    height: 0.92rem;
    text-align: center;
    background: #4dab57;
    font-size: 0.37rem;
    color: #fff;
    line-height: 0.92rem;
    border-radius: 0.1rem;
}

</style>