<template>
  <section class="game-over">
    <h1>Game Over</h1>
    
    <h2>Leaders</h2>
    <ul class="winners-circle players-list">
      <player-card v-for="(leader, index) in leaders" :key="index"
      :player="leader">
      </player-card>
    </ul>

    <!-- the rest of the field -->
    <template v-if="players.length > 2">
      <h3>Player Standings</h3>
      <ul class="players">
        <player-card v-for="(player, index) in players" :key="index"
        :player="player"
        ></player-card>
      </ul>
    </template>

    <app-button className="primary" v-on:clickEvent="resetGame">Play Again?</app-button>

    <video-background></video-background>
  </section>
</template>

<script>
import AppButton from './layout/AppButton.vue';
import PlayerCard from './layout/PlayerCard.vue';
import VideoBackground from './layout/VideoBackground.vue';

export default {
  name: 'game-over',
  components: {
    AppButton,
    PlayerCard,
    VideoBackground
  },
  computed: {
    players() { 
      const players = [...this.$store.getters.getPlayers];
      return players.slice(3, players.length);
    },
    leaders() {
      const players = [...this.$store.getters.getPlayers];
      return players.slice(0, 3);
    }
  },
  methods: {
    resetGame() {
      console.log('resetting the game');
      this.$store.dispatch('resetGame');
    }
  }
}
</script>

<style lang="scss">
.game-over {
  text-align: center;
}
</style>