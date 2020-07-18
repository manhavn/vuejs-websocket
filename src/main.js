// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'es6-promise/auto'
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({state, actions, mutations})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
