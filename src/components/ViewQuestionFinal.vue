<template>
  <div>
    <div v-if="!wagersSubmitted && !reveal">
      {{ question.category }} <button v-on:click="viewQuestion">Continue</button>
    </div>

    <div v-if="wagersSubmitted && !reveal">
      {{ question.question }} <button v-on:click="viewAnswer">Continue</button>
    </div>

    <div v-if="wagersSubmitted && reveal">
      {{ question.answer }} <app-button goTo="game-over">Show Results</app-button>
    </div>
  </div>
</template>

<script>
import AppButton from './layout/AppButton.vue';

export default {
  name: 'final-jeopardy',
  components: {
    AppButton
  },
  data() {
    return {
      wagersSubmitted: false,
      reveal: false
    }
  },
  props: {
    question: Object
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