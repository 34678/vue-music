// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 我们已经写好的四个组件的路由
import router from './router'
import 'babel-polyfill'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'

// body 下面的点击没有300ms的延迟
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
