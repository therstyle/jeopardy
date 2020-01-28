<template>
  <section class="view-question">
    <article v-for="(question, index) in question" :key="index">
      <!-- daily double -->
      <daily-double 
        v-if="question.daily_double"
        :question="question"
        :wager="wager"
        v-on:turnComplete="resetWager"
      ></daily-double>
      
      <!-- regular question -->
      <question-single
        v-else
        :question="question"
      ></question-single>

      <control-panel></control-panel>
    </article>
  </section>
</template>

<script>
import ViewQuestionSingle from './ViewQuestionSingle.vue';
import ViewQuestionDouble from './ViewQuestionDouble.vue';
import ControlPanel from './ControlPanel.vue';

export default {
  name: 'view-question',
  components: {
    'question-single': ViewQuestionSingle,
    'daily-double': ViewQuestionDouble,
    'control-panel': ControlPanel
  },
  computed: {
    currentQuestionId() {
      return this.$store.getters.getCurrentQuestionId;
    },
    question() {
      return this.$store.getters.getCurrentQuestion;
    },
    round() {
      return this.$store.getters.getRound;
    }
  },
  data() {
    return {
      wager: 0,
      buzzer: null
    }
  }
}
</script>