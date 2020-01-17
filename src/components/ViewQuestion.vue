<template>
  <section class="view-question">
    <article v-for="(question, index) in question" :key="index">
      <span>{{ question.question }}</span>

      <div class="control-panel">
        <select>
          <option></option>
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
    }
  },
  methods: {

  }
}
</script>