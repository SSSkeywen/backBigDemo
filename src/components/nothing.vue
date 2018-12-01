<template>
    <div>
        <p>{{tipsContent}}</p>
    </div>
</template>

<script>
    export default {
        props:['tipsContent']
    }
</script>

<style lang="scss" scoped>
p{
    padding: 0.2rem;
}
</style>