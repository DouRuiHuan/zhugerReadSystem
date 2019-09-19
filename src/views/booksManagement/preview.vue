<template>
  <div class="show_box">
    <myNav :bread="routerData"/>
    <div class="preview_box">
      <preview-left></preview-left>
      <preview-right></preview-right>
    </div>
  </div>
</template>
<script>
import previewLeft from "./components/previewLeft";
import previewRight from "./components/previewRight";
export default {
  components: { previewLeft, previewRight },
  data() {
    return {
      routerData: {
        content: []
      }
    };
  }
};
</script>
<style scoped>
.show_box {
  overflow-x: auto;
}
.preview_box {
  min-width: 100%;
  display: flex;
}
</style>

