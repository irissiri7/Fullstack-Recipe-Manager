<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: Rochester, sans-serif;
  margin: 0px;
  font-size: 4rem;
  color: white;
}
</style>
