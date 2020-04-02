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
.button-wrap {
  transition: 0.2s all ease-in-out;
  position: relative;
  display: inline-block;

  &:before,
  &:after {
    content: '';
    transition: 0.1s all ease-in-out;
    background: var(--purple);
    display: block;
    position: absolute;
    z-index: 2;
  }
  
  &:before {
    left: 0;
    width: 2px;
    height: 0;
    bottom: 0;
  }

  &:after {
    left: 0;
    top: 0;
    width: 0;
    height: 2px;
    transition-delay: 0.1s;
  }

  &:hover {
    &:before {
      height: 100%;
    }

    &:after {
      width: 100%;
    }

    button.primary {
      &:before {
        height: 100%;
      }

      &:after {
        width: 100%;
      }
    }
  }
}

button {
  background: none;
  font-family: var(--main-font);
  border: 2px solid transparent;
  padding: 1rem 2rem;
  transition: 0.2s all ease-in-out;
  min-width: 240px;
}

button.primary {
  font-size: 1.8rem;
  border-color: var(--white);

  &:before,
  &:after {
    content: '';
    transition: 0.1s all ease-in-out;
    background: var(--purple);
    display: block;
    position: absolute;
    z-index: 2;
  }

  &:before {
    right: 0;
    top: 0;
    width: 2px;
    height: 0;
    transition-delay: 0.2s;
  }

  &:after {
    right: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    transition-delay: 0.3s;
  }

  &:hover {
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
  }
}
</style>