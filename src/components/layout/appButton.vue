<template>
  <button :class="className" v-on:click="setCurrentComponent(goTo)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    className: String,
    text: String,
    goTo: String
  },
  methods: {
    setCurrentComponent(component) {
      if (this.goTo) {
        this.$store.dispatch('setCurrentComponent', component);
      }
    }
  }
}
</script>

<style lang="scss">
button.primary {
  background: none;
  border: none;
  padding: 0;
}
</style>