<template>
  <div>
    <base-button light mode="link" @click="goBack"
      >Back to My Recipes</base-button
    >
    <base-card>
      <h1>Add New Recipe</h1>
      <recipe-form />
    </base-card>
  </div>
</template>

<script>
import RecipeForm from '../components/RecipeForm.vue'

export default {
  components: {
    RecipeForm
  },
  methods: {
    goBack() {
      this.$router.push('/my-recipes')
    }
  }
}
</script>

<style scoped></style>
