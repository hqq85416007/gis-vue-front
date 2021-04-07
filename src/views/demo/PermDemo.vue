<template>
    <div class="perm-demo">
        <h1>权限使用教程</h1>
        <p>使用v-hasRole=['role1','role2']</p>
        <span v-hasRole="['admin']">
            admin角色能够看到
        </span>
        <span v-hasRole="['test']">
            test角色能够看到
        </span>
    </div>    
</template>
<script>
export default {
    name:'PermDemo'
}
</script>
<style scoped>

</style>