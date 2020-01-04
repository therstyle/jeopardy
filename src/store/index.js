import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    round: 1,
    categories: [],
    questions: []
  },
  mutations: {
    updateQuestions: (state, payload) => {
      state.questions = payload;
    }
  },
  actions: {
    updateQuestions: (context, payload) => {
      context.commit('updateQuestions', payload);
    }
  },
  modules: {
  }
})
