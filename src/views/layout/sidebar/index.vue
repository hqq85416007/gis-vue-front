<template>
  <div class="sidebar-container">
      <el-menu 
      :default-active="activeMenu" 
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      mode="vertical"
      style="border:0"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
  </div>
</template>
<script>
import SidebarItem from "./SidebarItem.vue";
import { constantRoutes } from "@/router";
export default {
  data() {
    return {
      permission_routes: constantRoutes
    };
  },
  components: { SidebarItem },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  }
};
</script>
<style scoped>
.sidebar-container{
  min-width: 200px;
  min-height: 100%;
  background-color: #304156;
}
</style>