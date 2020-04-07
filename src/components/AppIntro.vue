<template>
  <section class="intro">
    <div class="intro-content">
      <img src="images/logo.svg">
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
    sounds() {
      return this.$store.getters.getSounds;
    }
  },
  methods: {
    introSound() {
      console.log('play intro song');
      this.sounds.intro.play();
    }
  }
}
</script>

<style lang="scss">
.intro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-content {
  text-align: center;

  img {
    margin: 0 auto 3.2rem;
    display: block;
  }
}
</style>