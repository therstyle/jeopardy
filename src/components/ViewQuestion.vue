<template>
  <section class="view-question">
    <article v-for="(question, index) in question" :key="index">
      <span>{{ question.question }}</span>

      <div class="control-panel">
        <select v-on:change="setCurrentPlayer">
          <option value="0">Select Player</option>
          <option v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name }}</option>
        </select>

        <button v-on:click="setScore(-question.value)">Remove ${{ question.value }}</button>
        <button v-on:click="setScore(question.value)">Award ${{ question.value }}</button>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'view-question',
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
  methods: {
    setCurrentPlayer(e) {
      const id = parseInt(e.target.value);
      this.$store.dispatch('setCurrentPlayer', id);
      
      if (this.currentPlayer !== 0) {
        this.countDown();
      }
    },
    setScore(amount) {
      this.$store.dispatch('setScore', amount);
    },
    countDown() {
      setTimeout(function() {
        console.log('times up');
      }, 1000);
    }
  }
}
</script>