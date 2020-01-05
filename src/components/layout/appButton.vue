<template>
  <button :class="className">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    className: String,
    text: String
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