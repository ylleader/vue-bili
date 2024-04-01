import Vue from 'vue';
import App from './App.vue';

import '@/assets/style/css/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

import store from '@/store'
import router from '@/router'
import '@/router/routeGuard.js'

// import eruda from 'eruda'
// eruda.init()

import Msg from '@/utils/message.js'
import Loading from '@/utils/loading.js'
import Confirm from '@/utils/confirm.js'
import Login from '@/utils/login.js'

Vue.prototype.$msg = Msg
Vue.prototype.$loading = Loading
Vue.prototype.$confirm = Confirm
Vue.prototype.$login = Login


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
