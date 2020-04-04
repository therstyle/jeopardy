<template>
  <li class="player">
    <input class="player-name" v-model="player.name" :disabled="!editing">
    <ul class="stats">
      <li><span>Score:</span> <input type="number" v-model="player.score" :disabled="!editing"></li>
      <li><span>Correct:</span> {{ player.correct }}</li>
      <li><span>Wrong:</span> {{ player.wrong }}</li>
      <li><span>Accuracy</span> {{ player.accuracy }}%</li>
    </ul>
    
    <div class="icon-wrap">
      <div class="button-wrap button-edit">
        <button class="icon primary" v-if="round !== 3" v-on:click="toggleEditing" :title="editMessage">
          <img v-if="!editing" src="images/edit.svg">
          <img v-else src="images/save.svg">
        </button>
      </div>

      <div class="button-wrap button-delete">
        <button class="icon primary" v-if="round !== 3" v-on:click="removePlayer(player.name)" title="Delete Player"><img src="images/delete.svg"></button>
      </div>
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
    margin-bottom: 1.6rem;
  }

  .icon-wrap {
    display: flex;

    > *:not(:last-child) {
      margin-right: .8rem;
    }

    button {
      min-width: 0;
      width: 24px;
      height: 24px;
      overflow: hidden;
      padding: 4px;
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: transparent;
    
    img {
      max-width: 20px;
      max-height: 20px;
      width: 100%;
    }
  }

  .button-delete {
    &:before,
    &:after,
    button:before,
    button:after {
      background: var(--red);
    }
  }

  .button-edit {
    &:before,
    &:after,
    button:before,
    button:after {
      background: var(--green);
    }
  }

  .stats {
    margin-bottom: 1.6rem;

    li {
      display: flex;
      font-size: 1.6rem;

      > span {
        margin-right: .4rem;
        display: inline-block;
      }

      input {
        flex: 1;
        font-size: 1.6rem;
      }
    }
  }
}
</style>