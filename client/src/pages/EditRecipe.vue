<template>
  <div class="card">
    <h1>Edit recipe</h1>
    <recipe-form v-if="recipe" :recipe="recipe" />
  </div>
</template>

<script>
import RecipeForm from '../components/RecipeForm.vue'
import axios from 'axios'

export default {
  components: {
    RecipeForm
  },
  data() {
    return {
      recipe: null
    }
  },
  created() {
    axios
      .get(
        `${process.env.VUE_APP_MY_URL}recipes/recipe/get-recipe/?recipeId=${this.$route.params.id}`
      )
      .then(response => {
        this.recipe = response.data
        console.log(this.recipe)
      })
      .catch(error => console.log(error))
  }
}
</script>

<style></style>
