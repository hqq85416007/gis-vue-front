<template>
    <div class="img-demo">
        <h1>图片引入规范</h1>
        <p>框架图片统一存放在src/assets目录下，其中不同模块建立不同目录存放</p>
        <p>图片命令规范按照 项目名_模块名_名称@精度(可选).png 如iis_demo_vuex.png，1x是图片精度可选</p>
        <p>图片引入方式，参考src/views/demo/ImgDemo.vue代码</p>
        <img :src="demourl"/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            demourl:require("@/assets/demo/iis_demo_vuex.png")
        }
    }
}
</script>
<style scoped>

</style>