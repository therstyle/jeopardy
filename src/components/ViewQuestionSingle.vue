<template>
  <section class="view-question" :class="{ 'daily-double' : question.daily_double }">
    <!-- daily double -->
    <article v-if="question.daily_double">
      <div v-if="!reveal && wager > 0">
        {{ question.question }}

        <button v-on:click="revealAnswer">Reveal Answer</button>
      </div>
    
      <div v-if="reveal">
        {{question.answer }}

        <button v-on:click="turnComplete">Continue</button>
      </div>
    </article>

    <!-- regular questions -->
    <article v-else>
      <div v-if="!reveal">
        {{ question.question }}

        <button v-on:click="revealAnswer">Reveal Answer</button>
      </div>
      
      <div v-if="reveal">
        {{question.answer }}

        <button v-on:click="turnComplete">Continue</button>
      </div>
    </article>

    <control-panel></control-panel>
  </section>
</template>

<script>
import ControlPanel from './ControlPanel.vue';

export default {
  name: 'question-single',
  components: {
    'control-panel': ControlPanel
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