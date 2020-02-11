<template>
  <section class="players">
    <h1>Add Players</h1>

    <article v-if="round !== 1">
      <h2>After The Round {{ leader }} Is In The Lead!</h2>
    </article>

    <form v-if="round !== 3" v-on:submit.prevent="addPlayer">
      <input type="text" v-model="playerName" placeholder="Player Name" />
      <button>Add Player</button>

      <div v-if="errorPlayerName" class="error">Not a valid name</div>
      <div v-if="errorPlayerAmount" class="error">Not enough players</div>
    </form>

    <player></player>

    <app-button v-on:clickEvent="checkPlayers">
      <span v-if="round === 3">Start Final Jeopardy</span>
      <span v-else>Start The Round</span>
    </app-button>
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
      const players = this.$store.getters.getPlayers;
      const leader = players[0].name;
      return leader;
    }
  },
  data() {
    return {
      playerName: '',
      playerId: 0,
      errorPlayerName: false,
      errorPlayerAmount: false
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
          wager: 0,
          correct: 0,
          wrong: 0,
          accuracy: 0,
          answered: []
        };

        console.log(playerInfo);

        this.$store.dispatch('addPlayer', playerInfo);
        this.errorPlayerName = false;
        this.playerName = '';
      }
      else {
        this.errorPlayerName = true;
      }
    },
    checkPlayers() {
      const players = this.$store.getters.getPlayers;
      if (players.length > 0) {
        this.errorPlayerAmount = false;

        if (this.round === 3) {
          const questions = [...this.$store.getters.getQuestions];
          const questionId = questions[0].id;

          this.$store.dispatch('setCurrentComponent', 'final-jeopardy');
          this.$store.dispatch('setCurrentQuestionId', questionId);
          debugger;
        }
        else {
          this.$store.dispatch('setCurrentComponent', 'game-board');
        }
      }
      else {
        this.errorPlayerAmount = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>