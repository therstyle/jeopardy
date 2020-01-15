<template>
  <div>
    <h1>Game Board</h1>
    <ul>
      <li v-for="(category, index) in getCategories" :key="index">
        {{ category }}
      </li>
    </ul>
    
    <ul>
      <li v-for="(question, index) in getQuestions" :key="index">
        <a href="#" v-on:click.prevent="viewQuestion(question.id)">{{ question.question }}</a>
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
      return this.$store.getters.getQuestions;
    }
  },
  methods: {
    viewQuestion(id) {
      const currentQuestion = this.getQuestions.filter( question => {
        return question.id === id;
      });

      this.$store.dispatch('setCurrentQuestion', id);
      this.$store.dispatch('setCurrentComponent', 'view-question');
      console.log(currentQuestion);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>