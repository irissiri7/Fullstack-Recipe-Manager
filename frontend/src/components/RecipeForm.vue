<template>
  <transition name="modal">
    <base-modal v-if="showModal" @user-selection="deleteRecipe">
      <template v-slot:title>
        <h3>Are you sure you want to delete the recipe?</h3>
      </template>
      <template v-slot:content>
        <p>This action can not be undone</p>
      </template>
    </base-modal>
  </transition>
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
      <div
        class="ui checkbox"
        v-for="category in recipeDetailOptions.categories"
        :key="category"
      >
        <input
          type="checkbox"
          :value="category.toLowerCase()"
          v-model="recipe.details.categories"
        />
        <label>{{ category }}</label>
      </div>
    </div>
    <h4>Quality</h4>
    <div class="field">
      <div
        class="ui checkbox"
        v-for="quality in recipeDetailOptions.qualities"
        :key="quality"
      >
        <input
          type="checkbox"
          :value="quality.toLowerCase()"
          v-model="recipe.details.qualities"
        />
        <label>{{ quality }}</label>
      </div>
    </div>
    <h4>Time to cook</h4>
    <div class="field">
      <div
        class="ui radio checkbox"
        v-for="option in recipeDetailOptions.timeToCook"
        :key="option"
      >
        <input
          type="radio"
          :value="option"
          v-model="recipe.details.timeToCook"
        />
        <label>{{ option }}</label>
      </div>
    </div>
    <div class="field">
      <div v-if="initialRecipeData">
        <base-button
          :class="{ disabled: !formIsValid }"
          @click.prevent="updateRecipe"
        >
          Update
        </base-button>
        <base-button mode="alert" @click.prevent="showModal = true">
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
import client from '../util/Client'
import services from '../util/services.js'
import feedback from '../mixins/feedback.js'

dotenv.config()

export default {
  inject: ['recipeDetailOptions'],
  mixins: [feedback],
  data() {
    return {
      recipe: {
        _id: null,
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
      showModal: false
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
    // Ugly AF method. Please refactor
    formIsValid() {
      if (!this.initialRecipeData) {
        return !!this.recipe.title
      } else {
        if (!this.recipe.title) return false
        if (this.recipe.title != this.initialRecipeData.title) return true
        if (this.recipe.imageURL != this.initialRecipeData.imageURL) return true
        if (this.recipe.description != this.initialRecipeData.description)
          return true
        if (
          this.recipe.details.timeToCook !=
          this.initialRecipeData.details.timeToCook
        )
          return true
        if (
          !services.arrayContentIsSame(
            this.recipe.ingredients,
            this.initialRecipeData.ingredients
          )
        )
          return true
        if (
          !services.arrayContentIsSame(
            this.recipe.details.categories,
            this.initialRecipeData.details.categories
          )
        )
          return true
        if (
          !services.arrayContentIsSame(
            this.recipe.details.qualities,
            this.initialRecipeData.details.qualities
          )
        )
          return true
        else return false
      }
    }
  },
  methods: {
    addIngredient() {
      if (this.recipe.ingredients.includes(this.ingredient)) {
        this.displayFeedback('You have already added this ingredient', 'error')
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
    constructFormData() {
      const formData = new FormData()
      //Add recipe image
      const file = this.$refs.file.files[0]
      formData.append('image', file)
      //Add recipe information
      const data = {
        ...this.recipe,
        ...{ firebaseId: this.$store.getters.firebaseId }
      }
      formData.append('recipe', JSON.stringify(data))
      return formData
    },
    async addRecipe() {
      if (!this.formIsValid) {
        this.displayFeedback('The recipe must have a title', 'error')
        return
      }
      try {
        const formData = this.constructFormData()
        await client.addRecipe(formData)
        this.displayFeedback('Recipe added!')
        this.discardRecipe()
      } catch (error) {
        console.log(error)
        this.displayFeedback(`Could not add recipe :(`, 'error')
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
      try {
        const formData = this.constructFormData()
        await client.updateRecipe(formData)
        this.$router.push(`/my-recipes/${this.initialRecipeData._id}`)
      } catch (error) {
        console.log(error)
        this.displayFeedback(`Could not update recipe`, 'error')
      }
    },
    async deleteRecipe(confirmed) {
      this.showModal = false
      if (!confirmed) return
      try {
        await client.deleteRecipe(this.recipe._id)
        this.$router.push('/my-recipes')
      } catch (error) {
        console.log(error)
        this.displayFeedback('Could not delete recipe', 'error')
      }
    }
  },
  created() {
    if (this.initialRecipeData) {
      this.recipe._id = this.initialRecipeData._id
      this.recipe.title = this.initialRecipeData.title
      this.recipe.ingredients = this.initialRecipeData.ingredients.slice()
      this.recipe.imageURL = this.initialRecipeData.imageURL
      this.recipe.description = this.initialRecipeData.description
      this.recipe.details.categories = this.initialRecipeData.details.categories
      this.recipe.details.qualities = this.initialRecipeData.details.qualities
      this.recipe.details.timeToCook = this.initialRecipeData.details.timeToCook
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
