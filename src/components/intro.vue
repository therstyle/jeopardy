<template>
  <section class="intro">
    <div class="intro-content">
      <h1>Intro</h1>
      <app-button text="Start Game" className="primary"></app-button>
    </div>
  </section>
</template>

<script>
import AppButton from './layout/appButton.vue';

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