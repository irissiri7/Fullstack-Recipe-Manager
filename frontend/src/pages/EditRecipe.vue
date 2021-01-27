<template>
  <div>
    <base-button class="link light" @click="goBack">Go back</base-button>

    <base-card>
      <h1>Edit recipe</h1>
      <recipe-form
        v-if="initialRecipeData"
        :initialRecipeData="initialRecipeData"
      />
    </base-card>
  </div>
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
  methods: {
    goBack() {
      this.$router.go(-1)
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
