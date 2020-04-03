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
@import url('https://fonts.googleapis.com/css?family=Abel&display=swap');
@import './assets/css/vars';

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

html {
  font-size: 62.5%;
}

body {
  //opacity: 0.2; //Debug
  //background: var(--blue);
  background: #3532b7;
  background: -moz-linear-gradient(top,  #3532b7 0%, #2c3568 100%);
  background: -webkit-linear-gradient(top,  #3532b7 0%,#2c3568 100%);
  background: linear-gradient(to bottom,  #3532b7 0%,#2c3568 100%);
  font-family: var(--main-font);
  font-size: var(--font-size);
  color: var(--white);
  margin: 0;
}

#app {
  display: grid;
  min-height: 100vh;
}

main {
  > section {
    position: relative;
    padding: 3.2rem;
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-top: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-transform: uppercase;
}

h1 {
  font-size: 6.4rem;
  line-height: 1;
}

.container {
  max-width: var(--container-width);
  margin: auto;
}

form {
  .horizontal-group {
    display: flex;

    > input {
      flex: 1;
    }
  }
}

button {
  color: var(--white);
  background: none;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
  }
}

input {
  font-family: var(--main-font);
}
</style>
