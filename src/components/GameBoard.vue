<template>
  <section class="game-board">
    <Options-Overlay></Options-Overlay>
    <ul class="screens">
      <li class="screen category" v-for="(category, index) in getCategories" :key="index">
        {{ category }}
      </li>
      <li class="screen question" v-for="(question, index) in getQuestions" :key="index" :class="{ 'answered' : question.answered }">
        <a href="#" v-on:click.prevent="viewQuestion(question.id)">{{ question.value }}</a>
      </li>
    </ul>

    <video-background></video-background>
  </section>
</template>

<script>
import OptionsOverlay from './OptionsOverlay.vue';
import VideoBackground from './layout/VideoBackground.vue';

export default {
  name: 'game-board',
  components: {
    OptionsOverlay,
    VideoBackground
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
.screens {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: .4rem;
  padding: 0;

  > li {
    list-style: none;
  }
}

.answered {
  opacity: .10;
  pointer-events: none;
}
</style>