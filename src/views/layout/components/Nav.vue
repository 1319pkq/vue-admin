<template>
  <div id="nav-warp">
    <el-menu background-color="transparent" text-color="#ffffff" router>
      <template v-for="(item, index) in router">
        <el-submenu :index="index" :key="item.id" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <!-- 字级菜单 -->
          <el-menu-item
            :index="childItem.path"
            v-for="childItem in item.children"
            :key="childItem.id"
          >{{childItem.meta.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "nav-warp",
  data() {
    return {
      router: this.$router.options.routes
    };
  },
  methods: {},
  // 创建完成时
  created() {},
  // 挂载完成时
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-warp {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}

</style>