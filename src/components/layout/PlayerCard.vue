<template>
  <li class="player">
    <input v-model="player.name" :disabled="!editing">
    <ul>
      <li>Score: <input type="number" v-model="player.score" :disabled="!editing"></li>
      <li>Correct: {{ player.correct }}</li>
      <li>Wrong: {{ player.wrong }}</li>
      <li>Accuracy {{ player.accuracy }}%</li>
    </ul>
    
    <button v-on:click="toggleEditing">
      <span v-if="!editing">Edit Player</span>
      <span v-if="editing">Finish Editing</span>
    </button>

    <button v-on:click="removePlayer(player.name)">Delete Player</button>
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