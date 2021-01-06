<template>
  <div class="container" :style="{ height: `${this.height}rem` }">
    <img :src="src" alt="dish" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: false,
      default: 10
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 10px;
  height: 100%;
  object-fit: cover;
  width: 100%;
}
.container {
  width: 100%;
}
</style>
