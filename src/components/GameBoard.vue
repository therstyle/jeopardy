<template>
  <section class="game-board">
    <Options-Overlay></Options-Overlay>
    <ul class="screens">
      <li class="screen category" v-for="(category, index) in getCategories" :key="`category-${index}`">
        {{ category }}
      </li>
      <li class="screen question" v-for="(question, index) in getQuestions" :key="`question-${index}`" :class="{ 'answered' : question.answered }">
        <a href="#" v-on:click.prevent="viewQuestion(question)">${{ question.value }}</a>
      </li>
    </ul>

  </section>
</template>

<script>
import OptionsOverlay from './OptionsOverlay.vue';

export default {
  name: 'game-board',
  components: {
    OptionsOverlay
  },
  computed: {
    getCategories() {
      return this.$store.getters.getCategories;
    },
    getQuestions() {
      return this.$store.getters.getQuestions;
    }
  },
  methods: {
    viewQuestion(question) {
      const currentQuestion = this.getQuestions.filter( q => {
        return q.id === question.id;
      });

      if (question.daily_double) {
        this.$store.dispatch('playSound', 'dailyDouble');
      }

      this.$store.dispatch('setCurrentQuestionId', question.id);
      this.$store.dispatch('setCurrentComponent', 'question-single');
      console.log(currentQuestion);
    }
  }
}
</script>

<style lang="scss">
.game-board {
  background: #000;
}

.screens {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: .8rem;
  padding: 0;
  margin: 0;
  height: 100%;

  > li {
    list-style: none;
  }
}

.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4rem;
  background: var(--dark-blue);
  text-transform: uppercase;
  font-family: var(--price-font);
  text-shadow: 0 0.3vw 0 #000;
  padding: 1vw;
  transition: 0.2s all ease-in-out;

  &.category {
    font-size: 2.3vw;
    line-height: 1;
  }

  &.question {
    letter-spacing: 0.1vw;
    font-size: 4vw;

    &:not(.answered):hover {
      background: var(--dark-blue-alt);
    }

    > a {
      color: var(--dark-yellow);
    }
  }

  &.answered {
    > a {
      visibility: hidden;
      pointer-events: none;
    }
  }

  > a {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>