<template>
  <div class="carousel-view">
    <transition-group class="carousel" tag="div">
      <div v-for="num in images" class="slide" :key="num">
        <base-image
          :src="require(`@/assets/img${num}.jpg`)"
          alt="dish"
          :height="30"
        ></base-image>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [1, 2, 3, 4, 5]
    }
  },
  created() {
    setInterval(this.next, 3000)
  },
  methods: {
    next() {
      const first = this.images.shift()
      this.images = this.images.concat(first)
    }
  }
}
</script>

<style scoped>
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.slide {
  /* flex: 0 0 20em; */
  min-width: 100%;
  height: 100%;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.7s ease-in-out;
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}
</style>
