<template>
  <transition name="fade">
    <section class="game-board" :class="{'category-intro' : round !== 3 && intro && !skipIntro}">
      <Options-Overlay></Options-Overlay>
      <ul class="screens">
        <li class="screen category" v-for="(category, index) in getCategories" :data-category-title="category" :key="`category-${index}`">
          {{ category }}
        </li>
        <li class="screen question" v-for="(question, index) in getQuestions" :key="`question-${index}`" :class="{ 'answered' : question.answered }">
          <a href="#" v-on:click.prevent="viewQuestion(question)">${{ question.value }}</a>
        </li>
      </ul>

    </section>
  </transition>
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
    },
    round() {
      return this.$store.getters.getRound;
    },
    intro() {
      let introStatus = true;
      const questions = this.getQuestions;

      questions.forEach(question => {
        if (question.answered) {
          introStatus = false;
        }
      });

      return introStatus;
    },
    skipIntro() {
      return this.$store.getters.getSkipIntro;
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
@keyframes intro {
  0% {    
    transform: translateX(100%);
  }

  10% {
    transform: translateX(0);
  }

  90% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes box-fade {
  0% {
    z-index: 1;
    opacity: 1;
  }

  99% {
    z-index: 1;
    opacity: 1;
  }

  100% {
    z-index: -1;
    opacity: 0;
  }
}

.fade-leave-active {
  transition: all .5s ease-in;
}

.fade-leave-to {
  opacity: 0;
}

.game-board {
  background: #000;

  &.category-intro {
    &:before {
      content: '';
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: var(--dark-blue);
      display: block;
      position: absolute;
      z-index: -1;
      animation: box-fade 12s linear;
      animation-fill-mode: both;
    }

    .screen.category {
      &:before {
        content: attr(data-category-title);
        animation: intro 2s ease-in-out;
        animation-fill-mode: both;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: var(--dark-blue);
        width: 100%;
        height: 100vh;
        padding: 3.2rem;
        position: fixed;
        font-size: 12vw;
        line-height: 1;
        z-index: 98;
      }

      &:nth-child(2) {
        &:before {
          animation-delay: 2.0s;
        }
      }

      &:nth-child(3) {
        &:before {
          animation-delay: 4.0s;
        }
      }

      &:nth-child(4) {
        &:before {
          animation-delay: 6.0s;
        }
      }

      &:nth-child(5) {
        &:before {
          animation-delay: 8.0s;
        }
      }

      &:nth-child(6) {
        &:before {
          animation-delay: 10.0s;
        }
      }
    }
  }
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