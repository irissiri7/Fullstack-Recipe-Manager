<template>
  <div class="card">
    <h1>Add New Recipe</h1>
    <recipe-form />
  </div>
</template>

<script>
import RecipeForm from '../components/RecipeForm.vue'

export default {
  components: {
    RecipeForm
  }
}
</script>

<style scoped></style>
