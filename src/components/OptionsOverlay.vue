<template>
  <div class="options">
    <div class="icon-wrap">
      <div class="button-wrap">
        <button v-on:click="togglePause">Pause</button>
      </div>
      
      <div class="button-wrap">
        <button v-on:click="toggleMute">Sound</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Options-Overlay',
  methods: {
    togglePause: function() {
      this.$store.dispatch('setPaused');
      this.$store.dispatch('setCurrentComponent', 'players');
    },
    toggleMute: function() {
      this.$store.dispatch('setSound');
      console.log('toggling sound');
    }
  }
}
</script>

<style lang="scss">
.options {
  position: absolute;
  top: 0;
  right: 0;
}
</style>