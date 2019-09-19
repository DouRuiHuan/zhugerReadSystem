import Vue from "vue";

import "normalize.css/normalize.css"; // CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN";

import "@/styles/index.scss"// global css
import App from "./App"
import store from "./store"
import router from "./router"

import Navigation from "vue-navigation";

Vue.use(Navigation, { router })

import "@/icons" // icon
import "@/permission" // permission control

// import VueDND from 'awe-dnd'
// Vue.use(VueDND)
// 指令--输入框中只能输入数字
import enterNumber from "./directives/enterNumber"
Vue.use(enterNumber)
// 防止多次点击重复请求接口
import preventReclick from "./directives/preventReclick"
Vue.use(preventReclick)
// 导航栏
import myNav from "./components/newNav"
Vue.use(myNav)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
