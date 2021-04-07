<template>
  <div class="vuex-demo">
    <el-row>
      <el-col :span="12">
        <p>每个模块的vuex管理在src/store/modules.js下新建模块js</p>
        <pre>
         <xmp>
          //数据源
          const state={
             author:'zyw'
          }
          //state成员操作
          //组件中调用this.$store.commit('edit','name')
          const mutations={
             edit(state,name){
              state.author=name
              }
          }
          //异步操作ajax请求之类的操作
          //组件中调用this.$store.dispatch('aEdit','zhan')
          const actions={
              aEdit({commit},name){
              setTimeout(()=>{
                 commit('edit',name)
              },2000)
          }
          }
          export default{
             namespaced:true,
             state,
             mutations,
             actions
          }
        </xmp>
        </pre>
      </el-col>
      <el-col :span="12">
        <img :src="vuePng" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vuexPng from "@/assets/demo/iis_demo_vuex.png";
import {mapState} from 'vuex'
export default {
  name: "VuexDemo",
  data() {
    return {
      vuePng: vuexPng + "?" + new Date()
    };
  },
  computed:{
    //   author: function(){
    //       return this.$store.state.demo.author
    //   },
      ...mapState({
          author:state=>state.demo.author
      })
  }
};
</script>
<style scoped>
</style>