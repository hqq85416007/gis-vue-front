<template>
    <div class="vuerouter-demo">
        <h1>框架如何新增菜单与页面，即路由配置</h1>
        <p>框架中页面统一放在src/views目录下，其中<span style="color:red">按照不同模块建立目录</span></p>
        <p>页面的路由统一放在src/router/modules目录下，<span style="color:red">不同的模块建立不同的js</span></p>
        <p>例如框架教程模块为demo.js，其中包含了改模块所有路由的配置</p>
        <p>不同的模块路由js文件，最后在<span style="color:red">src/router/index.js中引入加入constantRoutes变量中</span></p>
    </div>
</template>
<script>
export default {
    name:'VueRouterDemo'
}
</script>