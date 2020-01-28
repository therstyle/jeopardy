<template>
  <section class="view-question">
    <article v-for="(question, index) in question" :key="index">
      <!-- daily double -->
      <daily-double 
        v-if="question.daily_double"
        :question="question"
        :wager="wager"
        v-on:turnComplete="resetWager"
      ></daily-double>
      
      <!-- regular question -->
      <question-single
        v-else
        :question="question"
      ></question-single>

      <div class="control-panel">
        <select v-on:change="setCurrentPlayer">
          <option value="0">Select Player</option>
          <option :id="`player-${player.id}`" v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name }}</option>
        </select>

        <template v-if="question.daily_double && currentPlayer !== 0">
          <div class="wager">
            <input type="number" v-model.number="wager" step="100" :max="maxWager">
            <!-- TODO: set current component to final jeopardy after round 2 -->
            <!-- TODO: final jeopardy wagers -->
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
    </article>
  </section>
</template>

<script>
import ViewQuestionSingle from './ViewQuestionSingle.vue';
import ViewQuestionDouble from './ViewQuestionDouble.vue';

export default {
  name: 'view-question',
  components: {
    'question-single': ViewQuestionSingle,
    'daily-double': ViewQuestionDouble
  },
  computed: {
    currentQuestionId() {
      return this.$store.getters.getCurrentQuestionId;
    },
    question() {
      return this.$store.getters.getCurrentQuestion;
    },
    players() {
      return this.$store.getters.getPlayers;
    },
    currentPlayer() {
      return this.$store.getters.getCurrentPlayer;
    },
    maxWager() {
      const players = [...this.players];
      const player = players.filter(player => player.id === this.currentPlayer);

      if (player[0]) {
        const max = player[0].score < 2000 ? 2000 : player[0].score;
        console.log(max);
        return max;
      }
      else {
        return 0;
      }
    },
    round() {
      return this.$store.getters.getRound;
    }
  },
  data() {
    return {
      wager: 0,
      buzzer: null
    }
  },
  methods: {
    setCurrentPlayer(e) {
      const id = parseInt(e.target.value);
      this.$store.dispatch('setCurrentPlayer', id);

      if (this.currentPlayer !== 0) {
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
    resetWager() {
      this.wager = 0;
    },
    countDown() {
      this.buzzer = setTimeout(function() {
        console.log('times up');
      }, 1000);
    }
  }
}
</script>