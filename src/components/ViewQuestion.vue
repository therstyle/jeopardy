<template>
  <section class="view-question">
    <article v-for="(question, index) in question" :key="index">
      <span>{{ question.question }}</span>

      <div class="control-panel">
        <select v-on:change="setCurrentPlayer">
          <option>Select Player</option>
          <option v-for="(player, index) in players" :key="index" :value="player.id">{{ player.name }}</option>
        </select>
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
    }
  },
  methods: {
    setCurrentPlayer(e) {
      console.log('selected player');
      this.$store.dispatch('setCurrentPlayer', e.target.value);
    }
  }
}
</script>