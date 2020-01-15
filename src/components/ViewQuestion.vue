<template>
  <section class="view-question">
    <h1>Viewing question # {{ currentQuestion }}</h1>
  </section>
</template>

<script>
export default {
  name: 'view-question',
  computed: {
    currentQuestion() {
      return this.$store.getters.getCurrentQuestion;
    }
  },
  methods: {

  }
}
</script>