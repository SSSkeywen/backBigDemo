<template>
    <div class="yy_cx">
		<button :disabled = "isClickBtn" class="style-click" @click="IKnow">{{btnCount}}</button>
    </div>
</template>

<script>
    export default {
        props:['btnCount',"isClickBtn"],
        methods: {
            IKnow() {
                console.log(111)
                this.$emit('IKnow')
                this.$emit('changCount')
            }
        },
    }
</script>

<style scoped>
.yy_cx {
    margin: 1.17647059em 15px 0.3em;
}
.yy_cx button {
    width: 100%;
    height: 46px;
    background-color: #00ae4d;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    border: none;
}
</style>