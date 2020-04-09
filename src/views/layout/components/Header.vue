<template>
  <div id="header-warp">
    <div class="pull-left header-icon">
      <div class="el-icon-s-operation" @click="navMenuState()"></div>
    </div>
    <div class="pull-right">
      <div class="user-info left">
        <img src="../../../assets/1.jpg" class="img" />
        哈哈哈hhhhhhhhhhhhhhhhhhhhhhhh
      </div>
      <div class="header-icon left">
        <div class="el-icon-coordinate"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-warp",
  data() {
    return {};
  },
  methods: {
    navMenuState() {
      // 触发vuex中的方法
      this.$store.commit('SET_COLLAPSE')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-warp {
  position: fixed;
  top: 0;
  right: 0;
  height: 75px;
  line-height: 75px;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.3);
  -webkit-transition: all .3s ease 0s;
}
.pull-left {
  float: left;
  margin-left: 35px;
  color: #666666;
  font-size: 26px;
  cursor: pointer;
}
.pull-right {
  float: right;
  .left {
    float: left;
  }
  .user-info {
    margin-right: 35px;
    .img {
      display: inline-block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 35px;
      vertical-align: -12px;
    }
  }
  .header-icon {
    width: 75px;
    height: 75px;
    color: #666666;
    font-size: 26px;
    text-align: center;
    cursor: pointer;
    border-left: 1px solid #d4d4d4;
  }
}
.open {
  #header-warp {
    left: $navMenu;
  }
}
.close {
  #header-warp {
    left: $navMenuMin;
  }
}
</style>