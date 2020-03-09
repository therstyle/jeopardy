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
import GameOver from './components/GameOver.vue';
import QuestionSingle from './components/ViewQuestionSingle';
import FinalJeopardy from './components/ViewQuestionFinal.vue';

export default {
  methods: {
    async loadData(url) {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      this.$store.dispatch('sortQuestions', data);
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
    GameOver,
    'question-single': QuestionSingle,
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
  opacity: 0.2; //Debug
  background: var(--blue);
  font-family: var(--questions-font);
  font-size: var(--font-size);
  color: var(--white);
  margin: 0;
}

#app {
  display: grid;
  min-height: 100vh;
}

@font-face { //categories & dollar amounts
    font-family: 'Swiss911 XCm BT';
    src: url('assets/fonts/Swiss911BT-ExtraCompressed.woff2') format('woff2'),
        url('assets/fonts/Swiss911BT-ExtraCompressed.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face { //questions
  font-family: 'ITC Korinna';
  src: url('assets/fonts/Korinna-Regular.woff2') format('woff2'),
      url('assets/fonts/Korinna-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

button {
  color: var(--white);
  background: none;
}
</style>
