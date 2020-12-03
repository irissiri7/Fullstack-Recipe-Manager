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

export default {
  components: {
    RecipeCard,
    CursiveHeader
  },
  data() {
    return {
      recipes: [
        {
          title: 'Recipe1',
          ingredients: [
            'ingredient1',
            'ingredient2',
            'ingredient3',
            'ingredient4'
          ],
          description: 'Lorem lorem lorem',
          details: {
            categories: ['Dinner'],
            details: ['Lactose free'],
            timeToCook: 'About 30 min'
          }
        },
        {
          title: 'Recipe2',
          ingredients: [
            'ingredient1',
            'ingredient2',
            'ingredient3',
            'ingredient4'
          ],
          description: 'Lorem lorem lorem',
          details: {
            categories: ['Dinner'],
            details: ['Lactose free'],
            timeToCook: 'About 30 min'
          }
        },
        {
          title: 'Recipe3',
          ingredients: [
            'ingredient1',
            'ingredient2',
            'ingredient3',
            'ingredient4'
          ],
          description: 'Lorem lorem lorem',
          details: {
            categories: ['Dinner'],
            details: ['Lactose free'],
            timeToCook: 'About 30 min'
          }
        }
      ]
    }
  },
  methods: {
    addRecipe() {
      this.$router.push('/my-recipes/add-recipe')
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
