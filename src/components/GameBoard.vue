<template>
  <div>
    <h1>Game Board</h1>
    <ul>
      <li v-for="(category, index) in getCategories" :key="index">
        {{ category }}
      </li>
    </ul>
    
    <ul>
      <li v-for="(question, index) in getQuestions" :key="index" :class="{ 'answered' : question.answered }">
        <a href="#" v-on:click.prevent="viewQuestion(question.id)">{{ question.value }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'game-board',
  computed: {
    getCategories() {
      return this.$store.getters.getCategories;
    },
    getQuestions() {
      const currentRound = this.$store.getters.getRound;
      const questions = this.$store.getters.getQuestions;
      return questions['round' + currentRound];
    }
  },
  methods: {
    viewQuestion(id) {
      const currentQuestionId = this.getQuestions.filter( question => {
        return question.id === id;
      });

      this.$store.dispatch('setcurrentQuestionId', id);
      this.$store.dispatch('setCurrentComponent', 'view-question');
      console.log(currentQuestionId);
    }
  }
}
</script>

<style lang="scss">
.answered {
  opacity: .10;
  pointer-events: none;
}
</style>