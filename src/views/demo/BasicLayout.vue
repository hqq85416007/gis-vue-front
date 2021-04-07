<template>
  <div class="basic-layout">
      <h1>ElementUI el-container嵌套布局</h1>
    <el-container style="background-color:red">
      <el-aside width="100px" style="background-color:#666">Aside</el-aside>
      <el-container >
        <el-header style="background-color:green">Header</el-header>
        <el-main style="background-color:grey;height:400px">Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "ElemntUI布局"
};
</script>
<style scoped>
</style>