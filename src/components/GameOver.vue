<template>
  <section class="game-over">
    <h1>Game Over</h1>
    
    <div class="winners-circle">
      <ul>
        <li v-for="(leader, index) in leaders" :key="index">
          {{ leader.name }}
          Score: {{ leader.score }} <br>
          Correct:{{ leader.correct }}<br>
          Wrong: {{ leader.wrong }}<br>
          Accuracy: {{ leader.accuracy }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'game-over',
  computed: {
    players() {
      const players = this.$store.getters.getPlayers;
      return players;
    },
    leaders() {
      const players = [...this.players];
      return players.slice(0, 4);
    }
  }
}
</script>