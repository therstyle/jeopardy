<template>
  <section class="view-question">
    <article v-for="(question, index) in question" :key="index">
      <div v-if="!reveal">{{ question.question }}</div>
      <div v-if="reveal">
        {{question.answer }}

        <button v-on:click="turnComplete">Continue</button>
      </div>

      <div class="control-panel">
        <select v-on:change="setCurrentPlayer">
          <option value="0">Select Player</option>
          <option v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name }}</option>
        </select>

        <button v-on:click="setScore(-question.value)">Remove ${{ question.value }}</button>
        <button v-on:click="setScore(question.value)">Award ${{ question.value }}</button>

        <div>
          <button v-on:click="revealAnswer">Reveal Answer</button>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
//import AppButton from './layout/AppButton.vue';

export default {
  name: 'view-question',
  components: {
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
      this.$store.dispatch('setScore', amount);
      if (amount > 0) {
        this.revealAnswer();
      }
    },
    countDown() {
      this.buzzer = setTimeout(function() {
        console.log('times up');
      }, 1000);
    },
    turnComplete() {
      console.log('end turn');
      this.reveal = false;
      this.$store.dispatch('setCurrentComponent', 'game-board');
      this.$store.dispatch('turnComplete');
    },
    revealAnswer() {
      console.log('reveal answer');
      this.reveal = true;
    }
  }
}
</script>