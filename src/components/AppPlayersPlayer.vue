<template>
  <ul>
    <li class="player" v-for="(player, index) in getPlayers" :key="index">
      <h3>{{ player.name }}</h3>
      <ul>
        <li>Score: {{ player.score }}</li>
        <li>Correct: {{ player.correct }}</li>
        <li>Wrong: {{ player.wrong }}</li>
        <li>Accuracy {{ player.accuracy }}%</li>
      </ul>
      
      <button v-on:click="removePlayer(player.name)">Delete Player</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'player',
  computed: {
    getPlayers() {
      return this.$store.getters.getPlayers();
    }
  },
  methods: {
    removePlayer(name) {
      this.$store.dispatch('removePlayer', name);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>