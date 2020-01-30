import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    round: 1,
    currentComponent: 'intro',
    currentQuestionId: 0,
    categories: [],
    questions: {},
    players: [],
    currentPlayerId: 0
  },
  getters: {
    getCurrentComponent: (state) => {
      return state.currentComponent;
    },
    getPlayers: (state) => {
      return state.players;
    },
    getQuestions: (state, getters) => {
      const currentRound = getters.getRound;
      const questions = state.questions;
      
      return questions['round' + currentRound];
    },
    getCategories: (state) => {
      return state.categories;
    },
    getCurrentQuestionId: (state) => {
      return state.currentQuestionId;
    },
    getCurrentQuestion: (state, getters) => {
      const currentId = getters.getCurrentQuestionId;
      const questions = [...getters.getQuestions];
      
      if (currentId !== 0) {
        const currentQuestion = questions.filter(data => data.id === getters.getCurrentQuestionId);
        return currentQuestion[0];
      }
      else {
        return {};
      }
    },
    getCurrentPlayerId: (state) => {
      return state.currentPlayerId;
    },
    getCurrentPlayer: (state, getters) => {
      const playerId = getters.getCurrentPlayerId;
      
      if (playerId !== 0) {
        const players = [...getters.getPlayers];
        const currentPlayer = players.filter(player => player.id === playerId);
        return currentPlayer[0];
      }
      else {
        return null;
      }
    },
    getCurrentPlayerWager: (state, getters) => {
      const player = getters.getCurrentPlayer;

      if (player !== null) {
        return player.wager;
      }
      else {
        return 99;
      }
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
    setCurrentQuestionId: (state, payload) => {
      state.currentQuestionId = payload;
    },
    setCurrentPlayerId: (state, payload) => {
      state.currentPlayerId = payload;
    },
    setRound: (state, payload) => {
      state.round = payload;
    },
    updateWager: (state, payload) => {
      const players = state.players;
      const playerId = state.currentPlayerId;
      players.forEach( player => {
        if (player.id === playerId) {
          player = payload;
        }
      });
    },
    resetWager: (state, payload) => {
      const players = state.players;
      const playerId = state.currentPlayerId;
      players.forEach( player => {
        if (player.id === playerId) {
          player.wager = payload;
        }
      });
    }
  },
  actions: {
    setQuestions: (context, payload) => {
      const data = [...payload];
      const round1 = data.filter( question => question.round === 'Jeopardy!');
      const round2 = data.filter( question => question.round === 'Double Jeopardy!');
      const round3 = data.filter( question => question.round === 'Final Jeopardy!');
      const questions = {
        round1: round1,
        round2: round2,
        round3: round3
      }

      context.commit('setQuestions', questions);
    },
    setCategories: function(context) {
      const currentRound = this.state.round;
      const categories = this.state.questions['round' + currentRound].map( data => {
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
      const currentPlayerId = this.state.currentPlayerId;

      players.forEach(function(player) {
        console.log(player.id);

        if (player.id === currentPlayerId) {
          player.score += parseInt(payload.score);
          player.score += player.wager;
          player.correct += payload.correct;
          player.wrong += payload.wrong;

          const total = player.wrong + player.correct;
          let accuracy = (player.correct / total) * 100;
          accuracy = Math.floor(accuracy);
          player.accuracy = accuracy;
        }
      });

      context.commit('setPlayers', players);
    },
    updateWager: (context, payload) => {
      const player = context.getters.getCurrentPlayer;
      player.wager = payload;

      context.commit('updateWager', player);
    },
    resetWager: (context, payload) => {
      context.commit('resetWager', payload);
    },
    setCurrentQuestionId: (context, payload) => {
      context.commit('setCurrentQuestionId', payload);
    },
    setCurrentPlayerId: (context, payload) => {
      context.commit('setCurrentPlayerId', payload);
    },
    turnComplete: function(context) {
      const currentRound = this.state.round;
      const questions = {...this.state.questions};
      const currentId = this.state.currentQuestionId;
      let i = 0;

      questions['round' + currentRound].forEach(question => {
        if (question.id === currentId) {
          question.answered = true;
        }
      });

      questions['round' + currentRound].forEach(question => {
        if (question.answered) {
          i++;
        }
      });

      console.log(`questions answered = ${i}`);
      console.log(questions['round' + currentRound].length);

      if (i === questions['round' + currentRound].length) {
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
