<template>
  <section class="app-main">
    <!-- <transition name="fade-transform"> -->
    <navigation>
      <router-view :key="key" />
    </navigation>
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      // return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
