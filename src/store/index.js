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
    },
    getPlayers: (state) => {
      return state.players;
    },
    getQuestions: (state) => {
      return state.questions;
    },
    getCategories: (state) => {
      return state.categories;
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
    setPlayers: (state, payload) => {
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
      const players = [...this.state.players, payload];
      const sortedPlayers = players.sort(function(a, b) {
        if (a.score > b.score) {
          return -1;
        }
        else {
          return 1;
        }
      });
      context.commit('setPlayers', sortedPlayers);
    },
    removePlayer: function (context, payload) {
      console.log('removing player');
      const players = this.state.players;
      const removedPlayers = players.filter(player => {
        return player.name !== payload;
      });
      context.commit('setPlayers', removedPlayers);
    }
  }
})
