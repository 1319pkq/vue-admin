<template>
  <div id="layout" :class="[navStatus ? 'close' : 'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./components/Header";
import LayoutMain from "./components/Main";
import LayoutNav from "./components/Nav";
export default {
  name: "layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  data() {
    return {};
  },
  computed: {
    navStatus() {
      return this.$store.state.isCollapse;
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
</style>