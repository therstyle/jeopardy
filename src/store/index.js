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
    setQuestions: (state, payload) => {
      state.questions = payload;
    },
    setCategories: (state, payload) => {
      state.categories = payload;
    }
  },
  actions: {
    setQuestions: (context, payload) => {
      context.commit('setQuestions', payload);
    },
    setCategories: (context, payload) => {
      const categories = payload.map( data => {
        return data.category;
      });

      const uniqueCategories = Array.from(new Set(categories));
      context.commit('setCategories', uniqueCategories);
    }
  },
  modules: {
  }
})
