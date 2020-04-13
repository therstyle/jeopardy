const loadData = async function(context, payload) {
  try {
    const response = await fetch(`https://jeopardyquestions.chrisrobertsweb.dev/wp-json/jq/v1/game/${payload}`);
    const data = await response.json();
    console.log(data);

    if (data.length === 0) {
      console.log('Invalid game ID');
      context.dispatch('setError', true);
    }
    else {
      context.dispatch('sortQuestions', data);
      context.dispatch('setCategories');
      context.dispatch('setError', false);
      context.dispatch('setCurrentComponent', 'players');
    }
  }
  catch(error) {
    console.log(error);
    context.dispatch('setError', true);
  }
};

const setId = (context, payload) => {
  context.commit('setId', payload);
}

const setError = (context, payload) => {
  context.commit('setError', payload);
}

const setQuestions = (context, payload) => {
  context.commit('setQuestions', payload);
};

const sortQuestions = (context, payload) => {
  const data = [...payload];
  const round1 = data.filter(question => question.round === 'Jeopardy!');
  const round2 = data.filter(question => question.round === 'Double Jeopardy!');
  const round3 = data.filter(question => question.round === 'Final Jeopardy!');
  const questions = {
    round1: round1,
    round2: round2,
    round3: round3
  }

  context.commit('setQuestions', questions);
};

const setCategories = function(context) {
  const currentRound = this.state.round;
  const categories = this.state.questions['round' + currentRound].map( data => {
    return data.category;
  });

  const uniqueCategories = Array.from(new Set(categories));
  context.commit('setCategories', uniqueCategories);
};

const setCurrentComponent = (context, payload) => {
  context.commit('setCurrentComponent', payload);
};

const addPlayer = function(context, payload) {
  const players = [...this.state.players, payload];
  context.commit('setPlayers', players);
};

const removePlayer = function(context, payload) {
  console.log('removing player');
  const players = this.state.players;
  const removedPlayers = players.filter(player => {
    return player.name !== payload;
  });

  context.commit('setPlayers', removedPlayers);
};

const setScore = function(context, payload) {
  const players = [...this.state.players];
  const findPlayer = players.filter(player => player.id === payload.id);
  const player = findPlayer[0];

  console.log(player);

  if (player) {
    console.log(`updating score for player ${player.id}`);

    player.score += parseInt(payload.score);
    player.correct += payload.correct;
    player.wrong += payload.wrong;

    const total = player.wrong + player.correct;
    let accuracy = (player.correct / total) * 100;
    accuracy = Math.floor(accuracy);
    player.accuracy = accuracy;

    const answered = player.answered;
    answered.push(this.state.currentQuestionId);
  }

  context.commit('setScore', payload);
};

const updateWager = (context, payload) => {
  const player = context.getters.getCurrentPlayer;
  player.wager = payload;

  context.commit('updateWager', player);
};

const resetWager = (context, payload) => {
  context.commit('resetWager', payload);
};

const setCurrentQuestionId = (context, payload) => {
  context.commit('setCurrentQuestionId', payload);
};

const setCurrentPlayerId = (context, payload) => {
  context.commit('setCurrentPlayerId', payload);
};

const turnComplete = function(context) {
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
};

const setRound = function(context) {
  const players = [...this.state.players];
  let round = this.state.round;
  round++;

  if (round > 3) {
    round = 1;
  }

  players.forEach(player => {
    player.answered = [];
  });
  
  console.log(`the round is... ${this.state.round}`);
  context.commit('setRound', round);
  context.dispatch('setCategories');
  context.dispatch('setSkipIntro', false);
};

const resetGame = function(context) {
  const players = [...this.state.players];

  players.forEach(player => {
    player.score = 0;
    player.correct = 0;
    player.wrong = 0;
    player.accuracy = 0;
    player.answered = [];
  });

  const questions = {...this.state.questions};

  questions.round1.forEach(question => question.answered = false);
  questions.round2.forEach(question => question.answered = false);
  questions.round3.forEach(question => question.answered = false);

  context.commit('setPlayers', players);
  context.dispatch('setRound');
  context.dispatch('setCurrentComponent', 'intro');
  context.dispatch('setCurrentQuestionId', 0);
  context.dispatch('setQuestions', questions);
  context.dispatch('setId', null);
};

const setSound = function (context) {
  const toggle = !this.state.sound;
  context.commit('setSound', toggle);
};

const setPaused = function (context) {
  const toggle = !this.state.paused;
  context.commit('setPaused', toggle);
};

const playSound = function (context, payload) {
  if (this.state.sound) {
    console.log(`playing ${payload} sound`);
    this.state['sounds'][payload].play();
  }

  else {
    console.log('sound is disabled');
  }
}

const killAllSounds = function() {
  console.log('stop all sounds');

  const sounds = this.state.sounds;
  for (const sound of Object.keys(sounds)) {
    sounds[sound].pause();
  }
};

const setSkipIntro = (context, payload) => {
  context.commit('setSkipIntro', payload);
}

export {
  loadData,
  setId,
  setError,
  setQuestions,
  sortQuestions,
  setCategories,
  setCurrentComponent,
  addPlayer,
  removePlayer,
  setScore,
  updateWager,
  resetWager,
  setCurrentQuestionId,
  setCurrentPlayerId,
  turnComplete,
  setRound,
  resetGame,
  setSound,
  setPaused,
  playSound,
  killAllSounds,
  setSkipIntro
}