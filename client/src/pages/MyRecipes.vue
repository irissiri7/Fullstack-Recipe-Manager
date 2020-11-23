<template>
  <div class="flex-corners">
    <h1>My Recipes</h1>
    <button class="circular ui huge icon button" @click="addRecipe">
      <i class="icon inverted plus"></i>
    </button>
  </div>
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
  methods: {
    addRecipe() {
      this.$router.push("/my-recipes/add-recipe");
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: Rochester, sans-serif;
  margin: 0px;
  font-size: 4rem;
}
.flex-corners {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}

.circular.ui.huge.icon.button {
  background-color: #7ea172;
}
</style>
