// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/styles/tailwind.css'
import Vuex from 'vuex'
import { store } from './store/index.js'
import { VueStars } from 'vue-stars'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import './vee-validate'
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate'
import VueCarousel from 'vue-carousel'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(VueLayers)
Vue.component('vue-stars', VueStars)
Vue.use(Vuex)
Vue.use(VueCarousel)
Vue.use(BootstrapVue)

Vue.config.productionTip = false
export const bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  template: '<App/>',
  components: { App }
})
