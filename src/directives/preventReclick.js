import Vue from "vue";
const preventReclick = Vue.directive("preventReclick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 6000);
      }
    });
  }
});
export default preventReclick;
