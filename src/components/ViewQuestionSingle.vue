<template>
  <section class="view-question" :class="{ 'daily-double' : question.daily_double, 'no-wager' : !wager && question.daily_double }">
    <Options-Overlay></Options-Overlay>

    <!-- daily double -->
    <article v-if="question.daily_double">
      <div v-if="!reveal && wager > 0">
        <h1>{{ question.question }}</h1>

        <div class="button-wrap">
          <button v-on:click="revealAnswer" class="primary">Reveal Answer</button>
        </div>
      </div>
    
      <div v-if="reveal">
        <h1>{{question.answer }}</h1>

        <div class="button-wrap">
          <button class="primary" v-on:click="turnComplete">Continue</button>
        </div>
      </div>
    </article>

    <!-- regular questions -->
    <article v-else>
      <div v-if="!reveal">
        <h1>{{ question.question }}</h1>

        <div class="button-wrap">
          <button v-on:click="revealAnswer" class="primary">Reveal Answer</button>
        </div>
      </div>
      
      <div v-if="reveal">
        <h1>{{question.answer }}</h1>

        <div class="button-wrap">
          <button v-on:click="turnComplete" class="primary">Continue</button>
        </div>
      </div>
    </article>

    <!-- <ul class="timer">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul> -->

    <control-panel></control-panel>
  </section>
</template>

<script>
import ControlPanel from './ControlPanel.vue';
import OptionsOverlay from './OptionsOverlay.vue';

export default {
  name: 'question-single',
  components: {
    'control-panel': ControlPanel,
    OptionsOverlay
  },
  data() {
    return {
      reveal: false
    }
  },
  computed: {
     wager() {
      return this.$store.getters.getCurrentPlayerWager;
    },
    question() {
      return this.$store.getters.getCurrentQuestion;
    },
  },
  methods: {
    turnComplete() {
      console.log('end turn');
      this.reveal = false;
      this.$store.dispatch('setCurrentComponent', 'game-board');
      this.$store.dispatch('turnComplete');
      this.$store.dispatch('resetWager', 0);
      this.$store.dispatch('setCurrentQuestionId', 0);
      this.$store.dispatch('setCurrentPlayerId', 0);
    },
    revealAnswer() {
      console.log('reveal answer');
      this.reveal = true;
    }
  }
}
</script>

<style lang="scss">
.view-question {
  background: var(--dark-blue);
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;

  &.no-wager {
    > article {
      background: url('/images/daily-double.png') top center no-repeat;
      background-size: cover !important;
    }
  }

  > article {
    background: transparent;
    flex: 1;
    font-family: var(--questions-font);
    text-transform: uppercase;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3.2rem;
    transition: 0.2s all ease-in-out;

    h1 {
      font-size: 4vw;
      text-shadow: 0.3vw 0.3vw 0 #000;
    }
  }
}

.timer {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  padding: 1.6rem;
  gap: 1.6rem;
  margin: 0;

  > li {
    background: var(--timer-bg);
    list-style: none;
    height: 2vw;
    transition: 0.2s all ease-in-out;
  }
}
</style>