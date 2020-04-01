<template>
  <div class="button-wrap">
    <button :class="className" v-on:click="clickEvent(goTo)">
      <slot></slot>
    </button>
  </div>
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
    clickEvent(payload) {
      this.setCurrentComponent(payload);
      this.$emit('clickEvent');
    },
    setCurrentComponent(component) {
      if (this.goTo) {
        this.$store.dispatch('setCurrentComponent', component);
      }
    }
  }
}
</script>

<style lang="scss">
button {
  background: none;
  font-family: var(--main-font);
  border: 2px solid transparent;
  padding: 1rem 2rem;
  transition: .3s all;
}

button.primary {
  font-size: 1.6rem;
  text-transform: uppercase;
  min-width: 240px;
  border-color: var(--white);

  &:hover {
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
  }
}
</style>