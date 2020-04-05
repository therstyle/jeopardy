<template>
  <div class="control-panel">
    <select v-on:change="setCurrentPlayerId">
      <option :selected="currentPlayerId === 0" value="0">Select Player</option>
      <option :id="`player-${player.id}`" v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name }} - ${{ player.score }}</option>
    </select>

    <template v-if="question.daily_double || round === 3 && currentPlayerId !== 0">
      <div class="wager">
        <input type="number" v-model.number="wager" step="100" :max="maxWager" v-on:keyup="isWagerValid">
        Maximum Wager: {{ maxWager }}
      </div>

      <div class="set-score">
        <div class="button-wrap button-negative">
          <button class="primary" :disabled="disableButtons" v-on:click="setScore(-wager)">Remove ${{ wager }}</button>
        </div>
        <div class="button-wrap button-positive">
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
        const max = player[0].score < 2000 ? 2000 : player[0].score;
        console.log(max);
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
       console.log(value);
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

      console.log(`checking button status for ${currentPlayer.id}`);
    },
    setCurrentPlayerId(e) {
      const id = parseInt(e.target.value);
      this.$store.dispatch('setCurrentPlayerId', id);

      const currentPlayerId = this.$store.getters.getCurrentPlayerId;

      this.isQuestionAnswered();
      
      if (currentPlayerId !== 0) {
        this.countDown();
      }
    },
    setScore(amount) {
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
      this.buzzer = setTimeout(function() {
        console.log('times up');
      }, 10000);
    },
    isWagerValid() {
      if(this.wager > this.maxWager) {
        this.disableButtons = true;
      }
      else {
        this.disableButtons = false;
      }
    }
  }
}
</script>

<style lang="scss">
.control-panel {
  background: #000;
  padding: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.set-score {
  > *:not(:last-child) {
    margin-right: 1.6rem;
  }
}

button {
  border-color: var(--white);
}
</style>