<template>
  <base-dialog-card
    v-if="feedback.message"
    :style="feedback.style"
    :bulletPoints="feedback.bulletPoints"
  >
    <p>{{ feedback.message }}</p>
  </base-dialog-card>
  <form class="ui form">
    <h3 class="ui dividing header">Recipe Name</h3>
    <div class="field">
      <input
        type="text"
        name="first-name"
        placeholder="Recipe Name"
        v-model.trim="recipe.title"
      />
    </div>
    <h3 class="ui dividing header">Image</h3>
    <div class="field">
      <div class="img-cnt">
        <img :src="src" />
      </div>
    </div>
    <div class="field" id="file-upload-cnt">
      <input
        type="file"
        name="image"
        ref="image"
        id="file-uploader"
        @change="handleFileUpload"
      />
      <base-button class="ui icon button" id="image-btn" @click.prevent="">
        Upload image
        <i class="upload icon"></i>
      </base-button>
    </div>
    <h3 class="ui dividing header">Ingredients</h3>
    <div class="field">
      <div class="fields">
        <div class="twelve wide field">
          <input
            type="text"
            name="ingredient"
            placeholder="Add ingredients"
            v-model.trim="ingredient"
            v-on:keyup.enter="addIngredient"
          />
        </div>
        <div class="four wide field">
          <base-button
            class="ui button full-width"
            @click.prevent="addIngredient"
          >
            Add
          </base-button>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <span>{{ ingredient }}</span>
        <button
          @click.prevent="removeIngredient(index)"
          class="circular ui icon button"
        >
          <i class="icon trash alternate outline red"></i>
        </button>
      </li>
    </ul>
    <h3 class="ui dividing header">Description</h3>
    <div class="field">
      <textarea v-model="recipe.description"></textarea>
    </div>
    <h3 class="ui dividing header">Details</h3>
    <h4>Category</h4>
    <div class="field">
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="breakfast"
          v-model="recipe.details.categories"
        />
        <label>Breakfast</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="lunch"
          v-model="recipe.details.categories"
        />
        <label>Lunch</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="dinner"
          v-model="recipe.details.categories"
        />
        <label>Dinner</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="starter"
          v-model="recipe.details.categories"
        />
        <label>Starter</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="dessert"
          v-model="recipe.details.categories"
        />
        <label>Dessert</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="other"
          v-model="recipe.details.categories"
        />
        <label>Other</label>
      </div>
    </div>
    <h4>Quality</h4>
    <div class="field">
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="gluten free"
          v-model="recipe.details.qualities"
        />
        <label>Gluten Free</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="lactose free"
          v-model="recipe.details.qualities"
        />
        <label>Lactose Free</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="vegetarian"
          v-model="recipe.details.qualities"
        />
        <label>Vegetarian</label>
      </div>
      <div class="ui checkbox">
        <input
          type="checkbox"
          value="vegan"
          v-model="recipe.details.qualities"
        />
        <label>Vegan</label>
      </div>
    </div>
    <h4>Time to cook</h4>
    <div class="field">
      <div class="ui radio checkbox">
        <input
          type="radio"
          value="About 15 min"
          v-model="recipe.details.timeToCook"
          checked="checked"
        />
        <label>About 15 min</label>
      </div>
      <div class="ui radio checkbox">
        <input
          type="radio"
          value="About 30 min"
          v-model="recipe.details.timeToCook"
        />
        <label>About 30 min</label>
      </div>
      <div class="ui radio checkbox">
        <input
          type="radio"
          value="60 min or more"
          v-model="recipe.details.timeToCook"
        />
        <label>60 min or more</label>
      </div>
    </div>
    <div class="field">
      <div v-if="initialRecipeData">
        <base-button class="ui button" @click.prevent="updateRecipe">
          Update
        </base-button>
        <base-button class="ui button" alert @click.prevent="deleteRecipe">
          Delete
        </base-button>
      </div>
      <div v-else>
        <base-button class="ui button" @click.prevent="addRecipe">
          Add
        </base-button>
        <base-button class="ui button" alert @click.prevent="discardRecipe">
          Discard
        </base-button>
      </div>
    </div>
  </form>
</template>

<script>
import dotenv from 'dotenv'
import axios from 'axios'
import service from '../util/services.js'

dotenv.config()

export default {
  data() {
    return {
      recipe: {
        title: '',
        imageURL: null,
        ingredients: [],
        description: '',
        details: {
          categories: [],
          qualities: [],
          timeToCook: 'About 15 min'
        }
      },
      ingredient: '',
      feedback: {
        message: null,
        bulletPoints: [],
        style: 'informational'
      }
    }
  },
  props: {
    initialRecipeData: {
      type: Object,
      default: null
    }
  },
  computed: {
    src() {
      return this.recipe.imageURL
        ? this.recipe.imageURL
        : 'https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg'
    },
    formIsValid() {
      return !!this.recipe.title
    }
  },
  methods: {
    addIngredient() {
      if (this.ingredient != '') {
        this.recipe.ingredients.push(this.ingredient)
        this.ingredient = ''
      }
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1)
    },
    async addRecipe() {
      if (!this.formIsValid) {
        this.feedback.message = 'Recipes must have a name!'
        this.feedback.style = 'error'
        window.scrollTo(0, 0)
        return
      }
      const data = {
        ...this.recipe,
        ...{ firebaseId: this.$store.getters.user }
      }
      try {
        await axios.post(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/add-recipe`,
          data,
          { headers: { Authorization: `Basic ${this.$store.getters.token}` } }
        )
        this.feedback.style = 'informational'
        this.feedback.message = 'Recipe added!'
        this.discardRecipe()
        window.scrollTo(0, 0)
      } catch (_error) {
        this.feedback.message = 'Could not add recipe :( ...'
      }
    },
    discardRecipe() {
      this.ingredient = ''
      this.recipe = {
        title: '',
        imageURL: null,
        ingredients: [],
        description: '',
        details: {
          categories: [],
          qualities: [],
          timeToCook: 'About 15 min'
        }
      }
    },
    async handleFileUpload() {
      const image = this.$refs.image.files[0]
      const formData = new FormData()
      formData.append('image', image)
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/add-image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.recipe.imageURL = response.data.src
      } catch (error) {
        this.feedback.message = error.response.data.message
        this.feedback.style = 'error'
      }
    },
    async updateRecipe() {
      try {
        await axios.put(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/update-recipe`,
          JSON.stringify(this.recipe),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.feedback.message = 'Recipe updated!'
        this.feedback.style = 'informational'
        window.scrollTo(0, 0)
      } catch (error) {
        this.feedback.message = 'Could not update recipe :( ...'
        this.feedback.style = 'error'
        window.scrollTo(0, 0)
      }
    },
    async deleteRecipe() {
      const success = await service.deleteRecipe(this.recipe._id)
      if (success) {
        this.$router.push('/my-recipes')
      } else {
        console.log('could not delete recipe')
      }
    }
  },
  created() {
    if (this.initialRecipeData) {
      this.recipe = this.initialRecipeData
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
.full-width {
  width: 100%;
}
div.ui.checkbox {
  margin-right: 5px;
}
.circular.ui.icon.button {
  background: none;
}
.circular.ui.icon.button:hover {
  font-size: 15px;
}

/* Css for overriding the default file uploader, its just too damn ugly */
#file-upload-cnt {
  position: relative;
}
#file-upload-cnt:hover > #image-btn {
  background-color: white;
  color: var(--main-pine);
}

#file-uploader {
  position: absolute;
  z-index: 99;
  opacity: 0;
}
</style>
