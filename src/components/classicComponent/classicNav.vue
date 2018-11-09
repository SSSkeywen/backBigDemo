<template>
    <div>
        <ul>
            <li>{{navListsOne}}1111</li>
            <!-- <li v-for="(item,index) in navLists" :key="index">
                <div>
                    <img src="" alt="">
                </div>
                <p></p>
            </li> -->
        </ul>
    </div>
</template>

<script>
    export default {
        props:['navListsOne'],
        // props: {
        //     navListsOne: {
        //         type: String,
        //         required: true
        //     },
        // },
        mounted(){
            // console.log(this.navListsOne)
        }
    }
</script>

<style lang="scss" scoped>

</style>