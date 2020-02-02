<template>
  <section class="view-question final-jeopardy">
    <article>
      <div v-if="!wagersSubmitted && !reveal">
        {{ question.category }} <button v-on:click="viewQuestion">Continue</button>
      </div>

      <div v-if="wagersSubmitted && !reveal">
        {{ question.question }} <button v-on:click="viewAnswer">Continue</button>
      </div>

      <div v-if="wagersSubmitted && reveal">
        {{ question.answer }} <app-button goTo="game-over">Show Results</app-button>
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
    },
    viewAnswer() {
      this.reveal = true;
    }
  }
}
</script>