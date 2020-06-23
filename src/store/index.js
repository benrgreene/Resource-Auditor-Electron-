import Vue from 'vue';
import Vuex from 'vuex';

import resource from './resource.js';

Vue.use(Vuex);

const state = {};

export default new Vuex.Store({
  state,
  modules: {
    resource,
  },
});
