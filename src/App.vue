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

*, *:before, *::after {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  outline: none;
}

html {
  font-size: 62.5%;
}

body {
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

.view-question {
  h1 {
    font-size: 4vw;
    line-height: 1.05;
    text-shadow: 0.3vw 0.3vw 0 #000;
  }
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
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

  .form-row {
    display: flex;
    justify-content: space-between;

    > :first-child {
      margin-right: 1.6rem;
    }
  }
}

.text-input {
  outline: none;
  border: none;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.33);
  transition: 0.2s all ease-in-out;

  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.33);
  }
}

.player-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 3rem;
  padding: 0;
  margin: 0 auto 6.4rem;

  > li {
    list-style: none;
  }
}

button {
  color: var(--white);
  background: none;
  text-transform: uppercase;
  outline: none;

  &:hover {
    cursor: pointer;
  }
}

.icon-wrap {
    display: flex;

    > *:not(:last-child) {
      margin-right: .8rem;
    }

    button {
      min-width: 0;
      width: 24px;
      height: 24px;
      overflow: hidden;
      padding: 4px;
    }
  }

  button.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: transparent;
    
    img {
      max-width: 20px;
      max-height: 20px;
      width: 100%;
    }
  }

  .button-delete,
  .button-negative {
    &:before,
    &:after,
    button:before,
    button:after {
      background: var(--red);
    }
  }

  .button-edit,
  .button-positive {
    &:before,
    &:after,
    button:before,
    button:after {
      background: var(--green);
    }
  }

  input {
    font-family: var(--main-font);
  }

  .form-group {
    input[type="radio"] {
      margin-right: 1rem;
    }
  }

  .error {
    margin-top: 1.6rem;
    text-align: right;
    color: var(--red);
    font-weight: bold;
  }
</style>
