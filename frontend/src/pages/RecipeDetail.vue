<template>
  <div>
    <cursive-header v-if="recipe">
      {{ recipe.title }}
    </cursive-header>
    <base-button class="link light" @click="goBack"
      >Back to My Recipes</base-button
    >
    <recipe-card
      v-if="recipe"
      :recipe="recipe"
      @deleted-recipe="handleRecipeDeletion"
    ></recipe-card>
  </div>
</template>

<script>
import RecipeCard from '../components/RecipeCard'
import CursiveHeader from '../components/CursiveHeader'
import dotenv from 'dotenv'
import client from '../util/Client'

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
    goBack() {
      this.$router.push('/my-recipes')
    },
    async fetchRecipe() {
      try {
        const recipe = await client.getRecipeById(this.$route.params.id)
        this.recipe = recipe
      } catch (error) {
        console.log(error)
        this.$router.push('/:notFound(.*)')
      }
    },
    handleRecipeDeletion() {
      this.$router.push('/my-recipes')
    }
  },
  created() {
    this.fetchRecipe()
  }
}
</script>

<style></style>
