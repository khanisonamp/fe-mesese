import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import App from './App.vue'
import './plugins/axios'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import router from './router'
import store from './store'



Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.use(vuetify, { iconfont: 'mdi' })
Vue.component('apexChart', VueApexCharts)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
