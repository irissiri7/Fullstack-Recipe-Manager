<template>
  <cursive-header v-if="recipe" :title="recipe.title" />
  <recipe-card
    v-if="recipe"
    :recipe="recipe"
    @deleted-recipe="handleRecipeDeletion"
  ></recipe-card>
</template>

<script>
import RecipeCard from '../components/RecipeCard'
import CursiveHeader from '../components/CursiveHeader'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export default {
  components: {
    RecipeCard,
    CursiveHeader
  },
  data() {
    return {
      recipe: null
    }
  },
  methods: {
    fetchRecipe() {
      axios
        .get(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/get-recipe/?recipeId=${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        .then(response => {
          this.recipe = response.data
          console.log(this.recipe)
        })
        .catch(error => console.log(error))
    },
    handleRecipeDeletion() {
      this.$router.push('/my-recipes')
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.fetchRecipe()
  }
}
</script>

<style></style>
