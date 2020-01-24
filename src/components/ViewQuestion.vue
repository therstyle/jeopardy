<template>
  <section class="view-question">
    <article v-for="(question, index) in question" :key="index">
      <!-- final jeopardy -->
      <final-jeopardy 
        v-if="round === 3"
      ></final-jeopardy>

      <!-- daily double -->
      <daily-double 
        v-else-if="question.daily_double"
      ></daily-double>
      
      <!-- regular question -->
      <question-single
        :question="question"
        :reveal="reveal" 
      ></question-single>

      <div class="control-panel">
        <select v-on:change="setCurrentPlayer">
          <option value="0">Select Player</option>
          <option :id="`player-${player.id}`" v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name }}</option>
        </select>

        <div v-if="question.daily_double" class="wager">
          <input type="number" v-model="player.wager">
        </div>

        <div v-else class="set-score">
          <button v-on:click="setScore(-question.value)">Remove ${{ question.value }}</button>
          <button v-on:click="setScore(question.value)">Award ${{ question.value }}</button>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import ViewQuestionSingle from './ViewQuestionSingle.vue';
import ViewQuestionDouble from './ViewQuestionDouble.vue';
import ViewQuestionFinal from './ViewQuestionFinal.vue';

export default {
  name: 'view-question',
  components: {
    'question-single': ViewQuestionSingle,
    'daily-double': ViewQuestionDouble,
    'final-jeopardy': ViewQuestionFinal
  },
  computed: {
    currentQuestion() {
      return this.$store.getters.getCurrentQuestion;
    },
    question() {
      const questions = this.$store.getters.getQuestions;
      return questions.filter(data => data.id === this.currentQuestion);
    },
    players() {
      return this.$store.getters.getPlayers;
    },
    currentPlayer() {
      return this.$store.getters.getCurrentPlayer;
    },
    round() {
      return this.$store.getters.getRound;
    }
  },
  data() {
    return {
      reveal: false,
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
    countDown() {
      this.buzzer = setTimeout(function() {
        console.log('times up');
      }, 1000);
    }
  }
}
</script>