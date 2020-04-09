<template>
  <section class="intro">
    <div class="intro-content">
      <img src="images/logo.svg" class="logo">
      <app-button className="primary" goTo="players" v-on:clickEvent="introSound">Start Game</app-button>
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
  computed: {
  },
  methods: {
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
</style>