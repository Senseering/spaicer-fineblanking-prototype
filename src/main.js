import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import i18n from '@/plugins/i18n';
import router from './router'

Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
