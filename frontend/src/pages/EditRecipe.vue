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
import client from '../util/Client.js'

export default {
  components: {
    RecipeForm
  },
  data() {
    return {
      initialRecipeData: null
    }
  },
  async created() {
    try {
      const recipe = await client.getRecipeById(this.$route.params.id)
      this.initialRecipeData = recipe
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style></style>
