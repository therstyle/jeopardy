import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    round: 1,
    currentComponent: 'intro',
    currentQuestionId: 0,
    categories: [],
    questions: {},
    players: [],
    currentPlayerId: 0,
    paused: false,
    sound: true,
    sounds: {
      intro: new Audio('sound/intro.mp3'),
      begin: new Audio('sound/begin.mp3'),
      roundIntro: new Audio('sound/round-intro.mp3'),
      dailyDouble: new Audio('sound/daily-double.mp3'),
      finalJeopardy: new Audio('sound/final-jeopardy.mp3'),
      endQuestion: new Audio('sound/end-question.mp3')
    }
  },
  getters: getters,
  mutations: mutations,
  actions: actions
});
