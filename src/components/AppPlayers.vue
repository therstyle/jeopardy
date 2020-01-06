<template>
  <section class="players">
    <h1>Add Players</h1>

    <form v-on:submit.prevent="addPlayer">
      <input type="text" v-model="playerName" placeholder="Player Name" />
      <button>Add Player</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'players',
  data() {
    return {
      playerName: '',
      error: false,
      playerId: 0
    }
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
        //this.$store.dispatch('setCurrentComponent', component);
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