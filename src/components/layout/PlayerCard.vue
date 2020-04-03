<template>
  <li class="player">
    <input class="player-name" v-model="player.name" :disabled="!editing">
    <ul class="stats">
      <li>Score: <input type="number" v-model="player.score" :disabled="!editing"></li>
      <li>Correct: {{ player.correct }}</li>
      <li>Wrong: {{ player.wrong }}</li>
      <li>Accuracy {{ player.accuracy }}%</li>
    </ul>
    
    <div class="icon-wrap">
      <button class="icon" v-if="round !== 3" v-on:click="toggleEditing" :title="editMessage">
        <span>{{ editMessage }}</span>
      </button>

      <button class="icon" v-if="round !== 3" v-on:click="removePlayer(player.name)" title="Delete Player">Delete Player</button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'player-card',
  props: {
    player: Object
  },
  data() {
    return {
      editing: false
    }
  },
  computed: {
    round() {
      return this.$store.getters.getRound;
    },
    editMessage() {
      if (this.editing) {
        return 'Save Changes';
      }
      else {
        return 'Edit Player';
      }
    }
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing;
    },
    removePlayer(name) {
      this.$store.dispatch('removePlayer', name);
    }
  }
}
</script>

<style lang="scss">
.player {
  text-align: left;
  padding: 1.6rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);

  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }

  input {
    border: none;
    width: 100%;
  }

  input:disabled {
    background: none;
    color: var(--white);
  }

  .player-name {
    font-size: 3.2rem;
  }

  .icon-wrap {
    display: flex;

    > button {
      min-width: 0;
      width: 24px;
      height: 24px;
      overflow: hidden;

      &:not(:last-child) {
        margin-right: .8rem;
      }
    }
  }

  .stats {
    margin-bottom: 1.6rem;

    li {
      display: flex;
      font-size: 1.6rem;

      input {
        flex: 1;
        font-size: 1.6rem;
      }
    }
  }
}
</style>