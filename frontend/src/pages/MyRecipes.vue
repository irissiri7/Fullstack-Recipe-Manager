<template>
  <div>
    <div class="flex-corners">
      <cursive-header class="cursive-header">
        My Recipes!
      </cursive-header>
      <div>
        <base-button class="circular icon" @click="addRecipe">
          <i class="icon plus"></i>
        </base-button>
        <base-button class="circular icon" @click="toggleFilters">
          <i class="icon filter"></i>
        </base-button>
      </div>
    </div>
    <transition-group tag="ul" name="recipe-card" class="positioned">
      <recipe-filters
        v-if="showFilters"
        :selectedFilters="selectedFilters"
        @filtering="handleFiltering"
      ></recipe-filters>

      <li class="recipe-li-item" v-for="recipe in recipes" :key="recipe._id">
        <recipe-card
          :recipe="recipe"
          show-compact
          @deletedRecipe="refreshData"
        ></recipe-card>
      </li>

      <p v-if="recipes.length === 0 && initialFetch">No recipes found</p>
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
  data() {
    return {
      initialFetch: false,
      recipes: [],
      showFilters: false,
      selectedFilters: {
        categories: [],
        qualities: [],
        timeToCook: ''
      }
    }
  },
  async created() {
    await this.fetchData()
    this.initialFetch = true
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
.recipe-li-item {
  min-width: 100%;
}

/* Transitions/Animations */
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
