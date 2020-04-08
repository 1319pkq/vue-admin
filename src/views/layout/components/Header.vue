<template>
  <div id="header-warp">
    头部
  </div>
</template>

<script>
export default {
  name: "header-warp",
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
#header-warp {
  position: fixed;
  top: 0;
  left: $navMenu;
  width: 100%;
  height: 75px;
  line-height: 75px;
  background: green;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .3);
}
</style>