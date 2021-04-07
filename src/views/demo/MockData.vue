<template>
  <div class="websocket-demo">
    <h1>框架如何Mock数据</h1>
    <p>
      mock就是对于某些不容易构造或者不容易获取的对象，用一个虚拟的对象来创建的方法。项目开发和测试过程中，遇到以下的情况时，就需要模拟结果返回。
    </p>
    <ul>
      <li>
        当另一方接口或服务还未完成，阻碍项目进度时，可以通过mock的方式，实现并行开发。
      </li>
      <li>
        另一方接口不稳定，而这边需要一个稳定的结果才能继续往下走流程时，也可以使用mock。有时候自动化测试需要一个持续稳定的环境，也可以对不是很重要的服务进行mock处理。
      </li>
      <li>需要模拟异常情况，但是这种异常不容易触发时，可以使用mock实现。</li>
    </ul>
    <p>
      框架mock数据统一按照模块划分，mock的ajax接口与src/api/xx.js中方法接口对应
    </p>
    <p>
      一个模块的mock接口在mock/modules中建立对应模块的js，示例如mock/modules/demo.js
    </p>
    <p style="color: red">
      默认只在生产环境mock数据,关闭Mock,注释src/main.js中代码
    </p>
    <pre>
       <xmp>
        //开发环境下使用mock.js
        if(process.env.NODE_ENV=="development"){
        const {mockXHR}=require('../mock')
        mockXHR()
        }
        </xmp>
   </pre>
  </div>
</template>
<script>
export default {
  name: "MockDemo",
};
</script>
<style scoped>
</style>