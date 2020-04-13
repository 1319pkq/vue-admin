<template>
  <div id="nav-warp">
    <div>
      <img src="../../../assets/logo.png" class="logo" />
    </div>
    <el-menu background-color="transparent" text-color="#ffffff" router :collapse="isCollapse">
      <template v-for="(item, index) in router">
        <el-submenu :index="index + ''" :key="item.id" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
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
  computed: {
    // 导航折叠状态改变
    isCollapse() {
      return this.$store.state.app.isCollapse;
    }
  },
  // 创建完成时
  created() {},
  // 挂载完成时
  mounted() {
    // console.log(this.$store.getters.count);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-warp {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  -webkit-transition: all .3s ease 0s;
}
.logo {
  width: 92px;
  height: 92px;
  margin: 28px auto 30px;
  -webkit-transition: all .3s ease 0s;
}
.open {
  #nav-warp {
    width: $navMenu;
  }
}
.close {
  #nav-warp {
    width: $navMenuMin;
  }
  #nav-warp .logo {
    width: 60%;
    height: 60%;
  }
}
</style>