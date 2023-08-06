<template>
  <section class="game-over">
    <div class="container">
      <h1>Game Over</h1>
    
      <h2>Leaders</h2>
      <ul class="winners-circle player-list">
        <player-card v-for="(leader, index) in leaders" :key="index"
        :player="leader">
        </player-card>
      </ul>

      <!-- the rest of the field -->
      <template v-if="players.length > 2">
        <h3>Player Standings</h3>
        <ul class="players player-list">
          <player-card v-for="(player, index) in players" :key="index"
          :player="player"
          ></player-card>
        </ul>
      </template>

      <app-button className="primary" v-on:clickEvent="resetGame">Play Again?</app-button>
    </div>

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
      this.$store.dispatch('resetGame');
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/vars';

.game-over {
  text-align: center;
}

.player-list.winners-circle {
  grid-template-columns: repeat(3, 1fr);

  > li {
    &:nth-child(1) {
      border-color: hsla(49, 94%, 53%, 0.7);
    }

    &:nth-child(2) {
      border-color: hsla(255, 100%, 100%, 0.7);
    }

    &:nth-child(3) {
      border-color: rgba(136, 91, 7, 0.7);
    }
  }
}

@media only screen and (max-width: $lg-phone) {
  .player-list.winners-circle {
    grid-template-columns: 1fr;
  }
}
</style>