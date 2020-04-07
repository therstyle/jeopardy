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
      intro: new Audio('sound/intro.mp3')
    }
  },
  getters: getters,
  mutations: mutations,
  actions: actions
});
