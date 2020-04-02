<template>
  <div class="video-bg">
    <video width="100" height="100" muted loop autoplay>
      <source src="video/bg-intro.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'Video-Background'
}
</script>

<style lang="scss">
.video-bg {
  position: fixed;
  z-index: -1;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

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