<template>
    <div class="cm-box">
        <ul>
            <li>
                <p>案件状态：</p>
                <p>结案</p>
            </li>
            <li>
                <p>操作机构：</p>
                <p>成都中心支公司</p>
            </li>
            <li>
                <p>结案时间：</p>
                <p>2016-09-01</p>
            </li>
            <li>
                <p>保单号：</p>
                <p>00751944007807</p>
            </li>
            <li>
                <p>提交的案件：</p>
                <p>结案<span class="orange" @click="clickLookOver">点击查看</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        methods: {
            clickLookOver() {
                this.$router.push({ path: "/toCasemxMsg" });
            }
        },
    }
</script>

<style lang="scss" scoped>
.cm-box{
    width: 95%;
    background-color: #fff;
    margin: 0.2rem auto;
    border-radius: 10px;
    ul{
        width: 90%;
        margin: 0 auto;
        padding:0.1rem 0;
        li{
            display: flex;
            justify-content: space-between;
            line-height: 0.52rem;
            border-bottom: 1px solid #d1d2d2;
        }
        li:last-child{
            border: none;
        }
    }
}
.orange{
    color: #fba41c;
}
</style>