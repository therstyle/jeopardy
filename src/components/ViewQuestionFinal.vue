<template>
  <section class="view-question final-jeopardy">
    <article>
      <div v-if="!wagersSubmitted && !reveal">
        <h1 v-html="question.category"></h1>
        
        <div class="button-wrap">
          <button class="primary" v-on:click="viewQuestion">Continue</button>
        </div>
      </div>

      <div v-if="wagersSubmitted && !reveal">
        <h1 v-html="question.question"></h1>
        
        <button class="primary" v-on:click="viewAnswer">Continue</button>
      </div>

      <div v-if="wagersSubmitted && reveal">
        <h1 v-html="question.answer"></h1>
        
        <app-button className="primary" goTo="game-over" v-on:clickEvent="resetValues">Show Results</app-button>
      </div>
    </article>

    <control-panel></control-panel>
  </section>
</template>

<script>
import AppButton from './layout/AppButton.vue';
import ControlPanel from './ControlPanel.vue';

export default {
  name: 'final-jeopardy',
  components: {
    AppButton,
    ControlPanel
  },
  data() {
    return {
      wagersSubmitted: false,
      reveal: false
    }
  },
  computed: {
    question() {
      const questions = this.$store.getters.getQuestions;
      return questions[0];
    }
  },
  methods: {
    viewQuestion() {
      this.wagersSubmitted = true;
      this.finalSound();
    },
    viewAnswer() {
      this.reveal = true;
      this.$store.dispatch('killAllSounds');
    },
    resetValues() {
      console.log('reset values');
      this.wagersSubmitted = false;
      this.reveal = false;
    },
    finalSound() {
      this.$store.dispatch('playSound', 'finalJeopardy');
    }
  }
}
</script>