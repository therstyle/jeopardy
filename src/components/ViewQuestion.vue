<template>
  <section class="view-question">
    <article>
      <p v-for="(question, index) in question" :key="index">{{ question.question }}</p>
    </article>

    <div class="control-panel">
      <select>
        <option></option>
      </select>
    </div>
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
    }
  },
  methods: {

  }
}
</script>