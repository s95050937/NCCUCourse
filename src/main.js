import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// plugins
import './plugins/element.js'
import './plugins/clipboard2'

// css
import './assets/css/index.css'
import './assets/css/normalize.css'

// utils 
import './utils/index'
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
