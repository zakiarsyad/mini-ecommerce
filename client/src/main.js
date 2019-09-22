import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification'
import VueSwal from 'vue-swal'

import 'vue-toast-notification/dist/index.css'
import '@/assets/css/tw-output.css'

Vue.use(VueSwal)
Vue.use(VueToast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
