<template>
  <div class="el-edit-demo">
    <h1>修改ElementUI框架样式</h1>
    <p>页面.vue文件中style加入scoped属性</p>
    <p>当一个style标签拥有scoped属性的时候，就相当于说明它里面的样式只作用于当前这个Vue页面，不会污染到全局的样式</p>
    <p>
      距离覆盖el-header默认样式
      <xmp>
        .app-wrapper >>> .el-header{
        padding: 0px;
        box-sizing: border-box;
        flex-shrink: 0;
        text-align: center;
        }
      </xmp>
    </p>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
</style>