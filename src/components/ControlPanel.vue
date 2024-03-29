<template>
  <div class="control-panel">
    <div class="form-group">
      <label>Players</label>
      <select v-on:change="setCurrentPlayerId">
        <option :selected="currentPlayerId === 0" value="0">Select Player</option>
        <option :id="`player-${player.id}`" v-for="(player, index) in players" :key="index" :value="player.id" :disabled="player.score <= 0 && round === 3">{{ player.name }} - ${{ player.score }}</option>
      </select>
    </div>

    <template v-if="question.daily_double || round === 3 && currentPlayerId !== 0">
      <div class="wager" :disabled="currentPlayerId === 0">
        <input :disabled="currentPlayerId === 0" type="number" v-model.number="wager" step="100" :max="maxWager" v-on:keyup="isWagerValid">
        Max Wager: {{ maxWager }}
      </div>

      <div class="set-score">
        <div class="button-wrap button-negative" :disabled="disableButtons">
          <button class="primary" :disabled="disableButtons" v-on:click="setScore(-wager)">Remove ${{ wager }}</button>
        </div>
        <div class="button-wrap button-positive" :disabled="disableButtons">
          <button class="primary" :disabled="disableButtons" v-on:click="setScore(wager)">Award ${{ wager }}</button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="set-score">
        <div class="button-wrap button-negative" :disabled="disableButtons">
          <button class="primary" :disabled="disableButtons" v-on:click="setScore(-question.value)">Remove ${{ question.value }}</button>
        </div>
        <div class="button-wrap button-positive" :disabled="disableButtons">
          <button class="primary" :disabled="disableButtons" v-on:click="setScore(question.value)">Award ${{ question.value }}</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'control-panel',
  data() {
    return {
      buzzer: null,
      disableButtons: true,
      selectDefault: true
    }
  },
  computed: {
    players() {
      return this.$store.getters.getPlayersByName;
    },
    currentPlayerId: {
      get() {
        return this.$store.getters.getCurrentPlayerId;
      },
      set(value) {
        this.$store.dispatch('setCurrentPlayerId', value);
      }
    },
    round() {
      return this.$store.getters.getRound;
    },
    maxWager() {
      const players = [...this.players];
      const player = players.filter(player => player.id === this.currentPlayerId);

      if (player[0]) {
        let max;
        
        if (this.round === 3) {
          max = player[0].score;
        }
        else {
          max = player[0].score < 2000 ? 2000 : player[0].score;
        }

        return max;
      }
      else {
        return 0;
      }
    },
    wager: {
     get() {
       return this.$store.getters.getCurrentPlayerWager;
     },
     set(value) {
       this.$store.dispatch('updateWager', value);
     }
    },
    question() {
      return this.$store.getters.getCurrentQuestion;
    },
  },
  methods: {
    isQuestionAnswered() {
      const currentQuestionId = this.question.id;
      const currentPlayer = this.$store.getters.getCurrentPlayer;
      const playerQuestionsAnswered = currentPlayer.answered;

      if (playerQuestionsAnswered && playerQuestionsAnswered.length !== 0) {
        playerQuestionsAnswered.forEach(id => {
          if (id === currentQuestionId) {
            this.disableButtons = true;
          }
          else {
            this.disableButtons = false;
          }
        });
      }
      else {
        this.disableButtons = false;
      }
    },
    setCurrentPlayerId(e) {      
      this.$emit('cancelTimer');

      const id = parseInt(e.target.value);
      this.$store.dispatch('setCurrentPlayerId', id);


      const currentPlayerId = this.$store.getters.getCurrentPlayerId;
      
      if (currentPlayerId !== 0) {
        this.isQuestionAnswered();

        if (!this.question.daily_double && this.round !== 3) {
          this.countDown();
        }
      }
      else {
       this.disableButtons = true; 
      }
    },
    setScore(amount) {
      this.$emit('cancelTimer');
      clearTimeout(this.buzzer);

      const id = this.currentPlayerId;
      let correct = 0;
      let wrong = 0;

      if (amount > 0) {
        correct++;
      }
      else {
        wrong++;
      }

      const stats = {
        id: id,
        score: amount,
        correct: correct,
        wrong: wrong
      }

      this.$store.dispatch('setScore', stats);
      this.isQuestionAnswered();
    },
    countDown() {
      clearTimeout(this.buzzer); //cancel any previous running timer

      this.$emit('initTimer'); // add class to begin timer animation

      this.buzzer = setTimeout(() => {
        this.$emit('cancelTimer');
        this.$store.dispatch('playSound', 'endQuestion');
      }, 5000);
    },
    isWagerValid() {
      if(this.wager > this.maxWager) {
        this.disableButtons = true;
      }
      else {
        this.disableButtons = false;

        if (this.currentPlayerId !== 0) {
          this.countDown();
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/vars';

.control-panel {
  background: #000;
  padding: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;

  label {
    display: block;
  }
}

.set-score {
  > *:not(:last-child) {
    margin-right: 1.6rem;
  }
}

button {
  border-color: var(--white);
}

.wager {
  &[disabled="disabled"] {
    opacity: 0.25;

    &:hover {
      cursor: not-allowed;
    }

    input {
      &:hover {
        cursor: not-allowed;
      }
    }
  }
}

@media only screen and (max-width: $lg-phone) {
  .control-panel {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1.6rem;

    .form-group {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    .wager {
      grid-column: 1 / 2;
      grid-row: 2 / 3;

      > input {
        display: block;
      }
    }

    .set-score {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      text-align: right;
      display: flex;
      flex-direction: column;

      > :first-child {
        margin-bottom: 0.8rem;
      }
    }

    .button-wrap {
      margin-right: 0;
    }

    button {
      min-width: 120px;
      font-size: 1.4rem;
      padding: 1rem;
    }
  }

  .wager {
    margin-right: .8rem;
  }
}
</style>