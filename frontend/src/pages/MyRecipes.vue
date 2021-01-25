<template>
  <div>
    <div class="flex-corners">
      <cursive-header class="cursive-header">
        My Recipes!
      </cursive-header>
      <div>
        <button class="circular ui icon button" @click="addRecipe">
          <i id="add-icon" class="icon inverted plus"></i>
        </button>
        <button class="circular ui icon button" @click="toggleFilters">
          <i id="add-icon" class="icon inverted filter"></i>
        </button>
      </div>
    </div>
    <transition-group tag="ul" name="recipe-card" class="positioned">
      <recipe-filters
        v-if="showFilters"
        :selectedFilters="selectedFilters"
        @filtering="handleFiltering"
      ></recipe-filters>

      <li v-for="recipe in recipes" :key="recipe._id">
        <recipe-card
          :recipe="recipe"
          show-compact
          @deletedRecipe="refreshData"
        ></recipe-card>
      </li>

      <p v-if="recipes.length === 0">No recipes found</p>
    </transition-group>
  </div>
</template>

<script>
import RecipeCard from '../components/RecipeCard.vue'
import CursiveHeader from '../components/CursiveHeader.vue'
import dotenv from 'dotenv'
import client from '../util/Client.js'
import RecipeFilters from '../components/RecipeFilters.vue'

dotenv.config()

export default {
  components: {
    RecipeCard,
    CursiveHeader,
    RecipeFilters
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      recipes: [],
      showFilters: false,
      selectedFilters: {
        categories: [],
        qualities: [],
        timeToCook: ''
      }
    }
  },
  methods: {
    addRecipe() {
      this.$router.push('/my-recipes/add-recipe')
    },
    async fetchData(queryParams) {
      try {
        const recipes = await client.getRecipes(queryParams)
        this.recipes = recipes
      } catch (error) {
        console.log(error)
      }
    },
    refreshData() {
      this.fetchData()
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    handleFiltering(queryData) {
      this.fetchData(queryData.query)
      this.selectedFilters = queryData.selectedFilters
    }
  }
}
</script>

<style scoped>
p {
  color: white;
  margin-top: 1em;
}
.positioned {
  position: relative;
}
.flex-corners {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.circular.ui.icon.button {
  background-color: var(--main-pine);
  border: 1px solid var(--main-pine);
}
.circular.ui.icon.button:hover {
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

@media screen and (max-width: 900px) {
  .flex-corners {
    display: block;
  }
  .cursive-header {
    margin-bottom: 1rem;
  }
}
</style>
