import loadingComponent from './index.vue'

const myNav = {
  install: function(Vue) {
    Vue.component('myNav', loadingComponent)
  } // 'myNav'这就是后面可以使用的组件的名字，install是默认的一个方法
}

export default myNav
