// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MyHttpServer from '@/plugins/http'


import moment from 'moment'
import ElementUI from 'element-ui'


Vue.use(ElementUI)
Vue.use(MyHttpServer)

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

Vue.filter('fmdata', v => {
	return moment(v).format('YYYY-MM-DD   hh:mm:ss')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
