<template>
  <button class="ui button">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.ui.button {
  background-color: var(--main-pine);
  border: 1px solid var(--main-pine);
  color: white;
}
.ui.button:hover {
  background-color: white;
  color: var(--main-pine);
}
</style>
