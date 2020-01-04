import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    round: 1,
    categories: [],
    questions: [],
    players: []
  },
  mutations: {
    updateQuestions: (state, payload) => {
      state.questions = payload;
    },
    updateCategories: (state, payload) => {
      state.categories = payload;
    }
  },
  actions: {
    updateQuestions: (context, payload) => {
      context.commit('updateQuestions', payload);
    },
    updateCategories: (context, payload) => {
      const categories = payload.map( data => {
        return data.category;
      });

      const uniqueCategories = Array.from(new Set(categories));
      context.commit('updateCategories', uniqueCategories);
    }
  },
  modules: {
  }
})
