<template>
  <ul>
    <li class="player" v-for="(player, index) in getPlayers" :key="index">
      <h3>{{ player.name }}</h3>
      <p> {{ player.score }}</p>
      <button v-on:click="removePlayer(player.name)">Delete Player</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'player',
  computed: {
    getPlayers() {
      return this.$store.getters.getPlayers;
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