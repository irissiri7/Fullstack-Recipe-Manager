<template>
  <div>
    <base-button light mode="link" @click="goBack">Go back</base-button>
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
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
