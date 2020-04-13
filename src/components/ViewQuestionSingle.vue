<template>
  <section class="view-question question-single" :class="{ 'daily-double' : question.daily_double, 'no-wager' : !wager && question.daily_double }">
    <Options-Overlay></Options-Overlay>

    <!-- daily double -->
    <article v-if="question.daily_double">
      <div v-if="!reveal && wager > 0">
        <h1 v-html="question.question"></h1>

        <div class="button-wrap">
          <button v-on:click="revealAnswer" class="primary">Reveal Answer</button>
        </div>
      </div>
    
      <div v-if="reveal">
        <h1 v-html="question.answer"></h1>

        <div class="button-wrap">
          <button class="primary" v-on:click="turnComplete">Continue</button>
        </div>
      </div>
    </article>

    <!-- regular questions -->
    <article v-else>
      <div v-if="!reveal">
        <h1 v-html="question.question"></h1>

        <div class="button-wrap">
          <button v-on:click="revealAnswer" class="primary">Reveal Answer</button>
        </div>
      </div>
      
      <div v-if="reveal">
        <h1 v-html="question.answer"></h1>

        <div class="button-wrap">
          <button v-on:click="turnComplete" class="primary">Continue</button>
        </div>
      </div>
    </article>

    <ul class="timer" :class="{ 'active' : showTimer }">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <control-panel v-on:initTimer="initTimer" v-on:cancelTimer="cancelTimer"></control-panel>
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
      reveal: false,
      showTimer: false
    }
  },
  computed: {
     wager() {
      return this.$store.getters.getCurrentPlayerWager;
    },
    question() {
      return this.$store.getters.getCurrentQuestion;
    }
  },
  methods: {
    initTimer() {
      console.log('init timer animation');
      this.showTimer = true;
    },
    cancelTimer() {
      console.log('cancel timer animation');
      this.showTimer = false;
    },
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
@keyframes flip {
  0% {
    transform: scale(0.1);
  }

  50% {
    transform: rotateX(150deg);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes countdown {
  0% {
    background: var(--timer-bg);
  }

  100% {
    background: rgba(255, 255, 255, 0.25);
  }
}

.view-question {
  background: var(--dark-blue);
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
  animation-fill-mode: forwards;

  &.daily-double {
    animation: flip ease-in-out 1s;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    opacity: 0;
    background: url('/images/daily-double.png') top center no-repeat;
    background-size: cover !important;
    transition: 0.2s all ease-in-out;
  }

  &.no-wager {
   &:before {
      opacity: 1;
    }
  }

  &.final-jeopardy {
    &:before {
      display: none;
    }
  }

  > article {
    position: relative;
    background: transparent;
    flex: 1;
    font-family: var(--questions-font);
    text-transform: uppercase;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3.2rem;

    h1 {
      font-size: 4vw;
      line-height: 1.15;
      text-shadow: 0.3vw 0.3vw 0 #000;
    }
  }
}

.timer {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  padding: 3.2rem;
  gap: 1.6rem;
  margin: 0;
  opacity: 0;

  > li {
    background: var(--timer-bg);
    list-style: none;
    height: 3vw;
    transition: 0.2s all ease-in-out;
  }

  &.active {
    opacity: 1;

    > li {
      animation: countdown 1s step-end;
      animation-fill-mode: both;
    }

    > li {
      &:nth-child(2),
      &:nth-child(8) {
        animation-delay: 1s;
      }

      &:nth-child(3),
      &:nth-child(7) {
        animation-delay: 2s;
      }

      &:nth-child(4),
      &:nth-child(6) {
        animation-delay: 3s;
      }

      &:nth-child(5) {
        animation-delay: 4s;
      }
    }
  }
}
</style>