<template>
  <div class="flex-corners">
    <cursive-header title="My Recipes!"></cursive-header>
    <button class="circular ui huge icon button" @click="addRecipe">
      <i class="icon inverted plus"></i>
    </button>
  </div>
  <recipe-card
    v-for="recipe in recipes"
    :key="recipe.title"
    :recipe="recipe"
    show-compact
  ></recipe-card>
</template>

<script>
import RecipeCard from '../components/RecipeCard.vue'
import CursiveHeader from '../components/CursiveHeader.vue'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export default {
  components: {
    RecipeCard,
    CursiveHeader
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      recipes: []
    }
  },
  methods: {
    addRecipe() {
      this.$router.push('/my-recipes/add-recipe')
    },
    fetchData() {
      axios
        .get(
          `${process.env.VUE_APP_MY_URL}recipes/get-recipes/?firebaseId=${this.$store.getters.user}`
        )
        .then(response => (this.recipes = response.data))
        .catch(error => console.log(error))
    }
  }
}
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
