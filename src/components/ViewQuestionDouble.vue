<template>
  <section class="view-question daily-double">
    <div v-if="!reveal && wager > 0">
      {{ question.question }}

      <button v-on:click="revealAnswer">Reveal Answer</button>
    </div>
    
    <div v-if="reveal">
      {{question.answer }}

      <button v-on:click="turnComplete">Continue</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'daily-double',
  data() {
    return {
      reveal: false
    }
  },
  computed: {
    wager() {
      return this.$store.getters.getCurrentPlayerWager;
    }
  },
  props: {
    question: Object
  },
  methods: {
    turnComplete() {
      console.log('end turn');
      this.reveal = false;
      this.$store.dispatch('setCurrentComponent', 'game-board');
      this.$store.dispatch('turnComplete');
      this.$store.dispatch('resetWager', 0);
      this.$store.dispatch('setCurrentQuestionId', 0);
    },
    revealAnswer() {
      console.log('reveal answer');
      this.reveal = true;
    }
  }
}
</script>