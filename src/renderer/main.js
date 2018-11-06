import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import { Store } from './models/Store.js'
import mixin from './mixin.js'

Store._store = store

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.$electron.window
/* eslint-disable no-new */

Vue.mixin(mixin);

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app')

