<template>
  <section class="intro">
    <div class="intro-content">
      <img src="images/logo.svg">
      <app-button className="primary" goTo="players">Start Game</app-button>
    </div>
    
    <div class="video-bg">
      <video width="100" height="100" muted loop autoplay>
        <source src="video/bg-intro.mp4" type="video/mp4">
      </video>
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

<style lang="scss">
.intro {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.intro-content {
  text-align: center;

  img {
    margin-bottom: 3.2rem;
  }
}

.video-bg {
  position: absolute;
  z-index: -1;
  width: 100%;

  &:before {
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: #3532b7;
    mix-blend-mode: multiply;
    position: absolute;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100vh;
    object-fit: fill;
    opacity: .5;
  }
}
</style>