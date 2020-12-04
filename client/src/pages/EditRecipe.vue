<template>
  <base-card>
    <h1>Edit recipe</h1>
    <recipe-form
      v-if="initialRecipeData"
      :initialRecipeData="initialRecipeData"
    />
  </base-card>
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
      initialRecipeData: null
    }
  },
  created() {
    axios
      .get(
        `${process.env.VUE_APP_MY_URL}recipes/recipe/get-recipe/?recipeId=${this.$route.params.id}`
      )
      .then(response => {
        this.initialRecipeData = response.data
      })
      .catch(error => console.log(error))
  }
}
</script>

<style></style>
