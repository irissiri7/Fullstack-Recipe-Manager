<template>
  <div class="flex center">
    <i v-if="!noLemon" class="lemon outline icon big"></i>
    <h1>Recipe Manager</h1>
  </div>
</template>

<script>
export default {
  props: {
    noLemon: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 0 0 0 10px;
  font-family: Rochester, sans-serif;
  font-size: 40px;
  color: var(--main-coffee);
}
i {
  color: var(--main-coffee);
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 30px;
    margin: 0px;
  }
}
</style>
