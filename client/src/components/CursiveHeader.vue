<template>
  <h1 :class="{ center: centered }">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  props: {
    centered: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: Rochester, sans-serif;
  margin: 0px;
  font-size: 4rem;
  color: white;
}
.center {
  text-align: center;
}
</style>
