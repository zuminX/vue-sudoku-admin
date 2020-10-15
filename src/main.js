import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import './plugins/element.js'
import '@/permission'

import '@/icons'
import '../semantic/dist/semantic.min.css'
import '../semantic/dist/semantic.min.js'
import '@/assets/styles/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
