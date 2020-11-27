<template>
  <div class="flex-corners">
    <cursive-header title="My Recipes!"></cursive-header>
    <button class="circular ui huge icon button" @click="addRecipe">
      <i class="icon inverted plus"></i>
    </button>
  </div>
  <template v-for="n in 10" v-bind:key="n">
    <recipe-card show-compact></recipe-card>
  </template>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import CursiveHeader from "../components/CursiveHeader.vue";

export default {
  components: {
    RecipeCard,
    CursiveHeader,
  },
  methods: {
    addRecipe() {
      this.$router.push("/my-recipes/add-recipe");
    },
  },
};
</script>

<style scoped>
.flex-corners {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}

.circular.ui.huge.icon.button {
  background-color: var(--main-pine);
}
</style>
