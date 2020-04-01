<template>
  <div>
    <Options-Overlay></Options-Overlay>
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
import OptionsOverlay from './OptionsOverlay.vue';

export default {
  name: 'game-board',
  components: {
    OptionsOverlay
  },
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

      this.$store.dispatch('setCurrentQuestionId', id);
      this.$store.dispatch('setCurrentComponent', 'question-single');
      console.log(currentQuestion);
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