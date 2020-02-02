<template>
  <div class="control-panel">
    <select v-on:change="setCurrentPlayerId">
      <option value="0">Select Player</option>
      <option :id="`player-${player.id}`" v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name }}</option>
    </select>

    <template v-if="question.daily_double || round === 3 && currentPlayerId !== 0">
      <div class="wager">
        <input type="number" v-model.number="wager" step="100" :max="maxWager">
      </div>

      <div class="set-score">
        <button v-on:click="setScore(-wager)">Remove ${{ wager }}</button>
        <button v-on:click="setScore(wager)">Award ${{ wager }}</button>
      </div>
    </template>

    <template v-else>
      <div class="set-score">
        <button v-on:click="setScore(-question.value)">Remove ${{ question.value }}</button>
        <button v-on:click="setScore(question.value)">Award ${{ question.value }}</button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'control-panel',
  data() {
    return {
      buzzer: null
    }
  },
  computed: {
    players() {
      return this.$store.getters.getPlayers;
    },
    currentPlayerId() {
      return this.$store.getters.getCurrentPlayerId;
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
    }
  },
  methods: {
    setCurrentPlayerId(e) {
      const id = parseInt(e.target.value);
      this.$store.dispatch('setCurrentPlayerId', id);

      if (this.currentPlayerId !== 0) {
        this.countDown();
      }
    },
    setScore(amount) {
      clearTimeout(this.buzzer);

      let correct = 0;
      let wrong = 0;

      if (amount > 0) {
        correct++;
      }
      else {
        wrong++;
      }

      const stats = {
        score: amount,
        correct: correct,
        wrong: wrong
      }

      this.$store.dispatch('setScore', stats);
    },
    countDown() {
      this.buzzer = setTimeout(function() {
        console.log('times up');
      }, 1000);
    }
  }
}
</script>