<template>
  <section class="players">
    <div class="container">
      <h1>Players</h1>

      <article v-if="round !== 1">
        <h2>After The Round {{ leader }} Is In The Lead!</h2>
      </article>

      <form class="add-player" v-if="round !== 3" v-on:submit.prevent="addPlayer">
        <div class="horizontal-group">
          <input type="text" v-model="playerName" placeholder="Enter Player Name" />
        </div>

        <div v-if="errorPlayerName" class="error">Not a valid name</div>
        <div v-if="errorPlayerAmount" class="error">Not enough players</div>
      </form>

      <player></player>

      <app-button v-on:clickEvent="checkPlayers" className="primary">{{ buttonText }}</app-button>
    </div>

    <video-background></video-background>
  </section>
</template>

<script>
import Player from './AppPlayersPlayer';
import AppButton from './layout/AppButton.vue';
import VideoBackground from './layout/VideoBackground.vue';

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
    },
    paused() {
      return this.$store.getters.getPaused;
    },
    buttonText() {
      let message;

      if (this.round === 3 && !this.paused) {
        message = 'Start Final Jeopardy';
      }
      
      else if (this.paused) {
        message = 'Continue Game';
      }

      else {
        message = 'Start The Round';
      }

      return message;
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
    AppButton,
    VideoBackground
  },
  methods: {
    playerSound() {
      this.$store.dispatch('playSound', 'begin');
    },
    roundIntroSound() {
      this.$store.dispatch('playSound', 'roundIntro');
    },
    stopSound() {
      this.$store.dispatch('killAllSounds');
    },
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
        this.playerSound();
        this.errorPlayerName = false;
        this.errorPlayerAmount = false;
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
        this.errorPlayerName = false;

        if (this.round === 3 && !this.paused) {
          const questions = [...this.$store.getters.getQuestions];
          const questionId = questions[0].id;

          this.$store.dispatch('setCurrentComponent', 'final-jeopardy');
          this.$store.dispatch('setCurrentQuestionId', questionId);
          //debugger;
        }

        else {
          this.stopSound();
          this.roundIntroSound();
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

<style lang="scss">
section.players {
  text-align: center;
}

.add-player {
  margin-bottom: 6.4rem;

  input[type="text"] {
    font-size: 3.2rem;
    padding: 2rem;
    outline: none;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.33);
    transition: 0.2s all ease-in-out;

    &:hover {
      box-shadow: 0 30px 30px rgba(0, 0, 0, 0.33);
    }
  }
}

.error {
  margin-top: 1.6rem;
  text-align: right;
  color: var(--red);
  font-weight: bold;
}
</style>