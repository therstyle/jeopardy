<template>
  <div class="options">
    <div class="icon-wrap">
      <button v-if="currentComponent !== 'players'" v-on:click="togglePause"><img src="images/pause.svg"></button>
      <button v-on:click="toggleMute">
        <img v-if="sound" src="images/volume.svg">
        <img v-else src="images/mute.svg">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Options-Overlay',
  computed: {
    sound() {
      return this.$store.getters.getSound;
    },
    currentComponent() {
      return this.$store.getters.getCurrentComponent;
    }
  },
  methods: {
    togglePause: function() {
      this.$store.dispatch('setPaused');
      this.$store.dispatch('setCurrentComponent', 'players');
      this.$store.dispatch('setSkipIntro', true);
    },
    toggleMute: function() {
      this.$store.dispatch('setSound');
      this.$store.dispatch('killAllSounds');
      console.log('toggling sound');
    }
  }
}
</script>

<style lang="scss">
.options {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 99;

  button {
    border-radius: 100%;
    border-color: var(--white);
  }

  img {
    width: 100%;
  }
}
</style>