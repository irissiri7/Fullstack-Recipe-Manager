<template>
  <div>
    <div class="flex-corners">
      <cursive-header>
        My Recipes!
      </cursive-header>
      <button class="circular ui huge icon button" @click="addRecipe">
        <i id="add-icon" class="icon inverted plus"></i>
      </button>
    </div>
    <transition-group tag="ul" name="recipe-card" class="positioned">
      <li v-for="recipe in recipes" :key="recipe._id">
        <recipe-card
          :recipe="recipe"
          show-compact
          @deletedRecipe="refreshData"
        ></recipe-card>
      </li>
    </transition-group>
  </div>
</template>

<script>
import RecipeCard from '../components/RecipeCard.vue'
import CursiveHeader from '../components/CursiveHeader.vue'
import dotenv from 'dotenv'
import client from '../util/Client.js'

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
    async fetchData() {
      try {
        const recipes = await client.getRecipes()
        this.recipes = recipes
      } catch (error) {
        console.log(error)
      }
    },
    refreshData() {
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.positioned {
  position: relative;
}
.flex-corners {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.circular.ui.huge.icon.button {
  background-color: var(--main-pine);
  border: 1px solid var(--main-pine);
}
.circular.ui.huge.icon.button:hover {
  background-color: white;
}
#add-icon:hover {
  color: var(--main-pine);
}

.recipe-card-enter-from,
.recipe-card-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.recipe-card-enter-active {
  transition: all 0.5s ease-in;
}
.recipe-card-leave-active {
  transition: all 0.5s ease-out;
  position: absolute;
}
.recipe-card-enter-to,
.recipe-card-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.recipe-card-move {
  transition: transform 0.5s ease;
}
</style>