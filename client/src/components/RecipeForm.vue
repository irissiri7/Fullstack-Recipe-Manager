<template>
  <transition name="feedback">
    <base-feedback-card v-if="feedback.message" :style="feedback.style">
      <p>{{ feedback.message }}</p>
    </base-feedback-card>
  </transition>
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
      <base-image :src="src" alt="dish" ref="image" />
    </div>
    <div class="field" id="file-upload-cnt">
      <input
        type="file"
        name="image"
        ref="file"
        id="file-uploader"
        @change="handleFileUpload"
      />
      <base-button class="icon" id="image-btn" @click.prevent="">
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
          <base-button class="full-width" @click.prevent="addIngredient">
            Add
          </base-button>
        </div>
      </div>
    </div>
    <transition-group tag="ul" name="ingredient-item">
      <li v-for="(ingredient, index) in recipe.ingredients" :key="ingredient">
        <span>{{ ingredient }}</span>
        <button
          @click.prevent="removeIngredient(index)"
          class="circular ui icon button"
        >
          <i class="icon trash alternate outline red"></i>
        </button>
      </li>
    </transition-group>
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
        <base-button @click.prevent="updateRecipe">
          Update
        </base-button>
        <base-button mode="alert" @click.prevent="deleteRecipe">
          Delete
        </base-button>
      </div>
      <div v-else>
        <base-button @click.prevent="addRecipe">
          Add
        </base-button>
        <base-button mode="alert" @click.prevent="discardRecipe">
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
        imageURL: '',
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
        message: undefined,
        style: undefined
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
      if (this.recipe.ingredients.includes(this.ingredient)) {
        this.displayError('You have already added this ingredient')
        this.ingredient = ''
      }
      if (this.ingredient != '') {
        this.recipe.ingredients.unshift(this.ingredient)
        this.ingredient = ''
      }
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1)
    },
    displayError(message) {
      window.scrollTo(0, 0)
      this.feedback.style = 'error'
      this.feedback.message = message
      setTimeout(() => {
        this.feedback.message = undefined
        this.feedback.style = undefined
      }, 3000)
    },
    async addRecipe() {
      if (!this.formIsValid) {
        this.displayError('The recipe must have a title')
        return
      }
      const formData = new FormData()
      const file = this.$refs.file.files[0]
      formData.append('image', file)
      const data = {
        ...this.recipe,
        ...{ firebaseId: this.$store.getters.firebaseId }
      }
      formData.append('recipe', JSON.stringify(data))
      try {
        await axios.post(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/add-recipe`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.feedback.message = 'Recipe added!'
        window.scrollTo(0, 0)
        this.discardRecipe()
      } catch (error) {
        if (error.response) {
          this.displayError(error.response.data.message)
        } else {
          this.displayError(`Could not add recipe :(`)
        }
        window.scrollTo(0, 0)
      }
    },
    discardRecipe() {
      this.ingredient = ''
      this.recipe = {
        title: '',
        imageURL: '',
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
      const file = this.$refs.file.files[0]
      this.recipe.imageURL = URL.createObjectURL(file)
    },
    async updateRecipe() {
      if (!this.formIsValid) {
        this.feedback.message = 'Recipes must have a name!'
        this.feedback.style = 'error'
        window.scrollTo(0, 0)
        return
      }
      try {
        const formData = new FormData()
        const file = this.$refs.file.files[0]
        formData.append('image', file)
        const data = {
          ...this.recipe,
          ...{ firebaseId: this.$store.getters.firebaseId }
        }
        formData.append('recipe', JSON.stringify(data))
        await axios.put(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/update-recipe`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.feedback.message = 'Recipe updated!'
        window.scrollTo(0, 0)
      } catch (error) {
        this.displayError(
          `Could not update recipe :( Server responded with: ${error.message}`
        )
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
@import '../assets/keyframes.css';

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

/* Animations/Transitions */

.ingredient-item-enter-from,
.ingredient-item-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.ingredient-item-enter-active {
  transition: all 1s ease-in;
}
.ingredient-item-leave-active {
  transition: all 1s ease-out;
  position: absolute;
}
.ingredient-item-enter-to,
.ingredient-item-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.ingredient-item-move {
  transition: transform 0.3s ease;
}

.feedback-enter-active {
  animation: fade 0.3s ease;
}
.feedback-leave-active {
  animation: fade 0.3s ease reverse;
}
</style>
