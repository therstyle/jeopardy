<template>
  <main id="app">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </main>
</template>

<script>
import Intro from './components/AppIntro.vue';
import Players from './components/AppPlayers.vue';
import GameBoard from './components/GameBoard.vue';
import ViewQuestion from './components/ViewQuestion.vue';
import GameOver from './components/GameOver.vue';
import FinalJeopardy from './components/ViewQuestionFinal.vue';

export default {
  methods: {
    async loadData(url) {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      this.$store.dispatch('setQuestions', data);
      this.$store.dispatch('setCategories');
    }
  },
  computed: {
    currentComponent() {
      return this.$store.getters.getCurrentComponent;
    }
  },
  components: {
    Intro,
    Players,
    GameBoard,
    ViewQuestion,
    GameOver,
    'final-jeopardy': FinalJeopardy
  },
  created() {
    this.loadData('sample.json');
  }
}
</script>

<style lang="scss">
@import './assets/css/vars';

html {
  font-size: 62.5%;
}

body {
  font-size: var(--font-size);
  margin: 0;
}

#app {
  display: grid;
  min-height: 100vh;
}
</style>
