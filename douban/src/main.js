import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload';

import 'common/css/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vue.use(VueLazyload, require('common/images/default.jpeg'));
