<template>
    <div class="axios-demo">
        <h1>使用平台的工具发送Ajax请求</h1>
         <p>平台针对Axios工具做一层封装，源码在src/utils/request.js中，开发人员使用request发送请求</p>
         <p style="color:red">平台所有的后台Api调用统一写在src/api中，其中不同模块建立不同js文件</p>
         <p style="color:red">其中不同模块js文件中方法名称与后台Controller应该一一对应</p>
         <p>具体参考代码，参考src/api/demo.js</p>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>