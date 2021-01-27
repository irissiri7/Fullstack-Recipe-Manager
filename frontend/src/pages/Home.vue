<template>
  <div>
    <cursive-header centered>
      Great to see you {{ firstName }}!
    </cursive-header>
    <base-card>
      <p>Recipe Manager is your own personal recipe book, put online.</p>
      <p>
        We make it super easy for you to add, edit and delete your favourit
        recipes, all in one place.
      </p>
      <p>
        No more sticky and greasy note books in the kitchen.
        <strong
          >Recipe Manager keeps it clean, managable and
          <em>always</em> available.</strong
        >
      </p>
      <base-image :src="src" alt="dish" :height="25" />
      <p class="side-note">
        This image was provided by
        <a href="https://spoonacular.com/food-api/" target="_blank"
          >Spoonacular API</a
        >
        Check out the recipe
        <a :href="spoonacularSource" target="_blank">here</a>
      </p>
    </base-card>
  </div>
</template>

<script>
import client from '../util/Client.js'
import axios from 'axios'
import dotenv from 'dotenv'

import CursiveHeader from '../components/CursiveHeader.vue'

dotenv.config()

export default {
  components: { CursiveHeader },
  data() {
    return {
      firstName: null,
      recipe: null
    }
  },
  computed: {
    src() {
      return this.recipe
        ? this.recipe.image
        : 'https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg'
    },
    spoonacularSource() {
      return this.recipe
        ? this.recipe.spoonacularSourceUrl
        : 'https://spoonacular.com/'
    }
  },
  created() {
    this.fetchData()
    this.fetchImage()
  },
  methods: {
    async fetchData() {
      try {
        const user = await client.getUserDetails()
        this.firstName = user.firstName
      } catch (error) {
        console.log(error)
      }
    },
    //Refactor to new client class, new client class or let be??
    async fetchImage() {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.VUE_APP_SPOONACULAR_API_KEY}`
        )
        this.recipe = response.data.recipes[0]
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
p {
  font-size: 14px;
}

.side-note {
  font-size: 12px;
}
</style>
