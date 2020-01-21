<template>
  <section class="players">
    <h1>Add Players</h1>

    <form v-on:submit.prevent="addPlayer">
      <input type="text" v-model="playerName" placeholder="Player Name" />
      <button>Add Player</button>
    </form>

    <artlce v-if="round > 1 && round < 3">
      <h2>After The Round X Is In The Lead!</h2>
    </artlce>

    <player></player>
    <app-button text="Continue" goTo="game-board"></app-button>
  </section>
</template>

<script>
import Player from './AppPlayersPlayer';
import AppButton from './layout/AppButton.vue';

export default {
  name: 'players',
  computed: {
    round() {
      return this.$store.getters.getRound;
    },
    leader() {
      //const players = '';
      return '';
    }
  },
  data() {
    return {
      playerName: '',
      error: false,
      playerId: 0
    }
  },
  components: {
    Player,
    AppButton
  },
  methods: {
    addPlayer() {
      console.log('add player');

      if (this.playerName !== '') {
        this.playerId++;

        let playerInfo = {
          id: this.playerId,
          name: this.playerName,
          score: 0,
          wager: 0
        };

        console.log(playerInfo);

        this.$store.dispatch('addPlayer', playerInfo);
        this.error = false;
        this.playerName = '';
      }
      else {
        this.error = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>