<template>
  <main id="app">
    <component :is="currentComponent"></component>
  </main>
</template>

<script>
import Intro from './components/intro.vue';

export default {
  methods: {
    async loadData(url) {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      this.$store.dispatch('setQuestions', data);
      this.$store.dispatch('setCategories', data);
    }
  },
  computed: {
    currentComponent() {
      return this.$store.getters.getCurrentComponent;
    }
  },
  components: {
    Intro
  },
  created() {
    this.loadData('sample.json');
  }
}
</script>

<style lang="scss">
@import './assets/css/vars';

html {
  font-size: 62.5%;
}

body {
  font-size: var(--font-size);
  margin: 0;
}

#app {
  display: grid;
  min-height: 100vh;
}
</style>
