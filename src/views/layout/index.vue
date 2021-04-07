<template>
  <div class="app-wrapper">
    <el-container style="height:100%">
      <el-aside style="background-color:#304156">
        <sidebar class="sidebar-wrapper"></sidebar>
      </el-aside>
      <el-container  direction="vertical">
        <el-header class="navbar" style="display:none">
            <navbar/>
        </el-header>
        <el-main style="height:100vh;">
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from "./sidebar/index.vue";
import AppMain from "./AppMain";
import Navbar from './Navbar'
export default {
  name: "Layout",
  components: {
    Sidebar,
    AppMain,
    Navbar
  }
};
</script>
<style scoped>
.navbar{
   background-color: #304156 ;
   color: white;
   line-height: 60px;
   box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

</style>