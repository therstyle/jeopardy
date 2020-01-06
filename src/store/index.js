import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    round: 1,
    currentComponent: 'intro',
    categories: [],
    questions: [],
    players: []
  },
  getters: {
    getCurrentComponent: (state) => {
      return state.currentComponent;
    }
  },
  mutations: {
    setQuestions: (state, payload) => {
      state.questions = payload;
    },
    setCategories: (state, payload) => {
      state.categories = payload;
    },
    setCurrentComponent: (state, payload) => {
      state.currentComponent = payload;
    },
    addPlayer: (state, payload) => {
      state.players = payload;
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
    },
    setCurrentComponent: (context, payload) => {
      context.commit('setCurrentComponent', payload);
    },
    addPlayer: function (context, payload) {
      const players = this.state.players;
      players.push(payload);
      context.commit('addPlayer', players);
    }
  }
})
