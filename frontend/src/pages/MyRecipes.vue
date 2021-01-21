<template>
  <div>
    <div class="flex-corners">
      <cursive-header>
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
    <transition name="filters">
      <recipe-filters
        v-if="showFilters"
        @filtering="handleFiltering"
      ></recipe-filters>
    </transition>
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
      showFilters: false
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
    handleFiltering(queryParams) {
      this.fetchData(queryParams)
    }
  }
}
</script>

<style scoped>
@import '../assets/keyframes.css';
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

.filters-enter-active {
  animation: fade 0.5s ease;
}
.filters-leave-active {
  animation: fade 0.5s ease reverse;
}
</style>
