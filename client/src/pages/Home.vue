<template>
  <div>
    <h1>Welcome {{ firstName }}!</h1>
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
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export default {
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
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_MY_URL}users/user/get-user-details/?firebaseId=${this.$store.getters.firebaseId}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.firstName = response.data.firstName
      } catch (error) {
        console.log(error)
      }
    },
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
  },
  created() {
    this.fetchData()
    this.fetchImage()
  }
}
</script>

<style scoped>
h1 {
  font-size: 70px;
  font-family: Rochester, sans-serif;
  color: white;
  text-align: center;
}
p {
  font-size: 20px;
}
.img-cnt {
  height: 20rem;
}
.side-note {
  font-size: 12px;
}
</style>
