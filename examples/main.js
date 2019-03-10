// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import DemoBlock from './components/demo-block.vue'
//import install from '../src/index'
//install(Vue);
import qiucodeUI from '../src/index'
import '../src/qiu-style/index.css'
//import qiucodeUI from '../src'
//import '../src/qiu-style/iconfont.css'

//"build": "webpack --display-error-details --config build/webpack.config.dist.js"
//---- "build": "node build/build.js"
//"private": true,
//"main": "dist/qiucodeUI.min.js",

Vue.config.productionTip = false
Vue.component("demo-block",DemoBlock);
Vue.use(qiucodeUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
