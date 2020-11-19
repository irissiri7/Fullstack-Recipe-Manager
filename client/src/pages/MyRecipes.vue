<template>
  <h1>My Recipes</h1>
  <template v-for="n in 10" v-bind:key="n">
    <recipe-card></recipe-card>
  </template>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
export default {
  components: {
    RecipeCard,
  },
};
</script>

<style></style>
