<template>
  <div>
    <div v-if="!reveal">
      {{ question.question }}

      <button v-on:click="revealAnswer">Reveal Answer</button>
    </div>
    
    <div v-if="reveal">
      {{question.answer }}

      <button v-on:click="turnComplete">Continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question-single',
  data() {
    return {
      reveal: false
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
    },
    revealAnswer() {
      console.log('reveal answer');
      this.reveal = true;
    }
  }
}
</script>