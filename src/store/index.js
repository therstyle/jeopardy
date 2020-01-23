import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    round: 1,
    currentComponent: 'intro',
    currentQuestion: 0,
    categories: [],
    questions: [],
    players: [],
    currentPlayer: 0
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
    },
    getCurrentQuestion: (state) => {
      return state.currentQuestion;
    },
    getCurrentPlayer: (state) => {
      return state.currentPlayer;
    },
    getRound: (state) => {
      return state.round;
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
    },
    setCurrentQuestion: (state, payload) => {
      state.currentQuestion = payload;
    },
    setCurrentPlayer: (state, payload) => {
      state.currentPlayer = payload;
    },
    setRound: (state, payload) => {
      state.round = payload;
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
    addPlayer: function(context, payload) {
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
    removePlayer: function(context, payload) {
      console.log('removing player');
      const players = this.state.players;
      const removedPlayers = players.filter(player => {
        return player.name !== payload;
      });

      context.commit('setPlayers', removedPlayers);
    },
    setScore: function(context, payload) {
      const players = this.state.players;
      const currentPlayer = this.state.currentPlayer;

      players.forEach(function(player) {
        console.log(player.id);

        if (player.id === currentPlayer) {
          player.score = player.score + payload.score;
          player.correct = player.correct + payload.correct;
          player.wrong = player.wrong + payload.wrong;
        }
      });

      context.commit('setPlayers', players);
    },
    setCurrentQuestion: (context, payload) => {
      context.commit('setCurrentQuestion', payload);
    },
    setCurrentPlayer: (context, payload) => {
      context.commit('setCurrentPlayer', payload);
    },
    turnComplete: function(context) {
      const questions = [...this.state.questions];
      const currentId = this.state.currentQuestion;

      questions.forEach(question => {
        if (question.id === currentId) {
          question.answered = true;
        }
      });

      let i = 0;
      questions.forEach(question => {
        if (question.answered) {
          i++;
        }
      });

      console.log(`questions answered = ${i}`);

      if (i === questions.length) {
        context.dispatch('setCurrentComponent', 'players');
        context.dispatch('setRound');
        console.log('start the next round');
      }

      context.commit('setQuestions', questions);
    },
    setRound: function(context) {
      console.log(`the round is... ${this.state.round}`);
      let round = this.state.round;
      round++;

      context.commit('setRound', round);
    }
  }
})
