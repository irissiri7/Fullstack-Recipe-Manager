<template>
  <div class="container">
    <img :src="src" alt="dish" ref="image" />
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
    }
  },
  methods: {
    getImageElement() {
      return this.$refs.image
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
  height: 10rem;
  width: 100%;
}
</style>
