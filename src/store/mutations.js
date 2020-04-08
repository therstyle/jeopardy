const setQuestions = (state, payload) => {
  state.questions = payload;
};

const setCategories = (state, payload) => {
  state.categories = payload;
};

const setCurrentComponent = (state, payload) => {
  state.lastComponent = state.currentComponent;
  state.currentComponent = payload;
};

const setPlayers = (state, payload) => {
  state.players = payload;
};

const setCurrentQuestionId = (state, payload) => {
  state.currentQuestionId = payload;
};

const setCurrentPlayerId = (state, payload) => {
  state.currentPlayerId = payload;
};

const setRound = (state, payload) => {
  state.round = payload;
};

const updateWager = (state, payload) => {
  const players = state.players;
  const playerId = state.currentPlayerId;
  players.forEach( player => {
    if (player.id === playerId) {
      player = payload;
    }
  });
};

const resetWager = (state, payload) => {
  const players = state.players;
  const playerId = state.currentPlayerId;
  players.forEach(player => {
    if (player.id === playerId) {
      player.wager = payload;
    }
  });
};

const setScore = (state, payload) => {
  const players = state.players;

  players.forEach(player => {
    if (player.id === payload.id) {
      player = payload;
    }
  });
};

const setSound = (state, payload) => {
  state.sound = payload;
};

const setPaused = (state, payload) => {
  state.paused = payload;
};

export {
  setQuestions,
  setCategories,
  setCurrentComponent,
  setPlayers,
  setCurrentQuestionId,
  setCurrentPlayerId,
  setRound,
  updateWager,
  resetWager,
  setScore,
  setSound,
  setPaused
}