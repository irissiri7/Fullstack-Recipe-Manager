<template>
  <div id="container">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#container {
  border-radius: 10px;
  box-shadow: 0px 0px 21px -1px rgba(0, 0, 0, 0.69);
  margin: 1rem auto 3rem;
  padding: 2rem;
  background-color: white;
  min-width: 100%;
}
</style>
