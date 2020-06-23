const baseState = {
  HTML: false,
  file: false,
};

const mutations = {
  SET_RESOURCE(state, resource) {
    state.HTML = resource.HTML;
    state.file = resource.file;
  },
};

const actions = {
  setResource({ commit }, resource) {
    commit('SET_RESOURCE', resource);
  }
};

export default {
  namespaced: true,
  state: baseState,
  mutations,
  actions,
};
