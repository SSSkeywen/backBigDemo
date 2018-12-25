<template>
    <div>
        <ul class="sxy_listBox_ul" id="tab">
            <li class="sxy_listBox" v-for="(item, i) in navlists" :key="i" :class="{specially: i ==index}" @click="select(i)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ["navlists"],
        data() {
            return {
				index: 0
            }
        },
        methods: {
           select(i){
               this.index = i
               this.$emit('myindex', i)
           }
        },
    }
</script>

<style lang="scss" scoped>
.sxy_listBox_ul{height:50px;width:100%;}
.sxy_listBox {width:50%;float:left; text-align:center;height:50px;line-height:50px; background:#ebebeb; color:#666;}
.specially{background:#30b639; color:#fff;}
</style>