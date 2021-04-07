<template>
    <div class="vue-debug">
        <h1>VSCODE如何调试Vue代码</h1>
        <h2>前置条件</h2>
        <ul>
            <li>1. VSCODE已安装 Debugger for Chrome 扩展</li>
            <li>2. 在项目中配置了launch.json文件</li>
            <li>3. 检查vue.config.js的configureWebpack中已配置devltool:source-map</li>
            <li>4. 以上平台框架已配置好，参考文档https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html</li>
        </ul>
        <h2>调试步骤</h2>
        <ul>
            <li>1. 运行npm run dev</li>
            <li>2. vscode 运行debug</li>
            <li>3. 在需要调试的代码处打断电</li>
        </ul>
        <img :src="debugPng"/>
    </div>
</template>
<script>
export default {
    name:'VueDebug',
    data(){
        return {
            debugPng:require("@/assets/demo/iis_demo_debug.png")
        }
    }
}
</script>
<style scoped>

</style>