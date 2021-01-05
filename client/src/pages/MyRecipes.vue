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
          `${process.env.VUE_APP_MY_URL}recipes/get-recipes/?firebaseId=${this.$store.getters.firebaseId}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        .then(response => (this.recipes = response.data))
        .catch(error => console.log(error))
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
  transition: all 1s ease-in;
}
.recipe-card-leave-active {
  transition: all 1s ease-out;
  position: absolute;
}
.recipe-card-enter-to,
.recipe-card-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.recipe-card-move {
  transition: transform 1s ease;
}
</style>
