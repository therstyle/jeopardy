const getCurrentComponent = (state) => {
  return state.currentComponent;
};

const getLastComponent = (state) => {
  return state.lastComponent;
}

const getId = (state) => {
  return state.id;
}

const getError = (state) => {
  return state.idError;
}

const getPlayers =  (state) => {
  const players = [...state.players];
  const sortedPlayers = players.sort((a,b) => a.score > b.score ? -1 : 1);
  console.log(sortedPlayers);
  return sortedPlayers;
};

const getPlayersByName =  (state) => {
  const players = [...state.players];
  const sortedPlayers = players.sort((a,b) => a.name < b.name ? -1 : 1);
  console.log(sortedPlayers);
  return sortedPlayers;
};

const getQuestions =  (state, getters) => {
  const currentRound = getters.getRound;
  const questions = state.questions;
  
  return questions['round' + currentRound];
};

const getCategories =  (state) => {
  return state.categories;
};

const getCurrentQuestionId =  (state) => {
  return state.currentQuestionId;
};

const getCurrentQuestion = (state, getters) => {
  const currentId = getters.getCurrentQuestionId;
  const questions = [...getters.getQuestions];
  const currentQuestion = questions.filter(data => data.id === currentId);
  
  if (currentId !== 0) {
    console.log(currentQuestion);
    return currentQuestion[0];
  }
  else {
    return {};
  }
};

const getCurrentPlayerId =  (state) => {
  return state.currentPlayerId;
};

const getCurrentPlayer =  (state, getters) => {
  const playerId = getters.getCurrentPlayerId;
  
  if (playerId !== 0) {
    const players = [...getters.getPlayers];
    const currentPlayer = players.filter(player => player.id === playerId);
    return currentPlayer[0];
  }
  else {
    return null;
  }
};

const getCurrentPlayerWager =  (state, getters) => {
  const player = getters.getCurrentPlayer;

  if (player !== null) {
    return player.wager;
  }
  else {
    return 0;
  }
};

const getRound =  (state) => {
  return state.round;
};

const getPaused = (state) => {
  return state.paused;
};

const getSound = (state) => {
  return state.sound;
};

const getSounds = (state) => {
  return state.sounds;
}

const getSkipIntro = (state) => {
  return state.skipIntro;
}

const getLoading = (state) => {
  return state.loading;
}

export {
  getCurrentComponent,
  getLastComponent,
  getId,
  getError,
  getPlayers,
  getPlayersByName,
  getQuestions,
  getCategories,
  getCurrentQuestionId,
  getCurrentQuestion,
  getCurrentPlayerId,
  getCurrentPlayer,
  getCurrentPlayerWager,
  getRound,
  getPaused,
  getSound,
  getSounds,
  getSkipIntro,
  getLoading
}