import Vue from 'vue';
import App from './components/App.vue';
import store from './store/index.js';

Vue.config.productionTip = false;

// Setup app w/ store
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
