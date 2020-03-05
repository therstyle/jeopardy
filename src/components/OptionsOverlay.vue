<template>
  <div class="options">
    <button v-on:click="toggleMute">Sound</button>
    <button v-on:click="togglePause">Pause</button>
  </div>
</template>

<script>
export default {
  name: 'Options-Overlay',
  methods: {
    togglePause: function() {
      this.$store.dispatch('setPaused');
    },
    toggleMute: function() {
      this.$store.dispatch('setSound');
    }
  }
}
</script>