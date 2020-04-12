<template>
  <section class="intro">
    <div class="intro-content">
      <img src="images/logo.svg" class="logo">
      <app-button v-if="!begin" className="primary" v-on:clickEvent="displayOptions">Start Game</app-button>

      <div v-if="begin">
        <h3>Choose Mode</h3>
        <form class="choose-mode">
          <div class="form-row">
            <div class="form-group">
              <input type="radio" name="mode" value="random" id="random" v-model="mode">         
              <label for="random">Random Game</label>
            </div>

            <div class="form-group">
              <input type="radio" name="mode" value="code" id="code" v-model="mode">
              <label for="random">Game ID</label>
            </div>
          </div>

          <div v-if="mode === 'code'">
            <input id="game-id" class="text-input" type="number" value="0" v-model="id" placeholder="Enter Game ID">
            <div v-if="error" class="error">Invalid Game Code</div>
          </div>
        </form>

        <app-button className="primary" v-on:clickEvent="start">Continue</app-button>
      </div>
    </div>
    
    <video-background></video-background>
  </section>
</template>

<script>
import AppButton from './layout/AppButton.vue';
import VideoBackground from './layout/VideoBackground.vue';

export default {
  name: 'intro',
  components: {
    AppButton,
    VideoBackground
  },
  data() {
    return {
      mode: 'random',
      begin: false
    }
  },
  computed: {
    id: {
      get() {
        return this.$store.getters.getId;
      },
      set(value) {
        this.$store.dispatch('setId', value);
      }
    },
    error() {
      return this.$store.getters.getError;
    }
  },
  methods: {
    start() {
      this.introSound();
      this.$store.dispatch('getGameData');
    },
    displayOptions() {
      this.begin = true;
    },
    introSound() {
      this.$store.dispatch('playSound', 'intro');
    }
  }
}
</script>

<style lang="scss">
@keyframes scale {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.intro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-content {
  text-align: center;

  .logo {
    margin: 0 auto 3.2rem;
    display: block;
    animation: scale 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    z-index: 2;
  }
}

.choose-mode {
  margin: 0 auto 6.4rem;
  max-width: 240px;

  input[type="number"] {
    width: 100%;
    padding: 1.6rem;
    font-size: 1.8rem;
  }
}

#game-id {
  margin-top: 3.2rem;
}
</style>