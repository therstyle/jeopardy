<template>
  <ul>
    <li class="player" v-for="(player, index) in getPlayers" :key="index">
      <h3>{{ player.name }}</h3>
      <p> {{ player.score }}</p>
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
}
</script>

<style lang="scss" scoped>

</style>