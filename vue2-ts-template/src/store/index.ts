import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment(state) {
      state.counter++;
    }
  },
  actions: {
    // async fetchData({ commit }) {
    //   // Пример запроса через Axios
    //   // const data = await api.get('/endpoint');
    //   // commit('setData', data);
    // }
  },
  getters: {
    doubleCounter: state => state.counter * 2
  }
});