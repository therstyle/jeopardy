<template>
  <div>
    <h1>Game Board</h1>
    <ul>
      <li v-for="(question, index) in getQuestions" :key="index">
        {{ question.question }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'game-board',
  computed: {
    getQuestions() {
      return this.$store.getters.getQuestions;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>