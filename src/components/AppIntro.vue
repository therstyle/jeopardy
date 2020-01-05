<template>
  <section class="intro">
    <div class="intro-content">
      <app-button text="Start Game" className="primary" goTo="players"></app-button>
    </div>
  </section>
</template>

<script>
import AppButton from './layout/AppButton.vue';

export default {
  name: 'intro',
  components: {
    AppButton
  }
}
</script>

<style lang="scss" scoped>
.intro {
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-content {
  text-align: center;
}
</style>