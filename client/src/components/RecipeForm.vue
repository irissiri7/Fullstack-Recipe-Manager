<template>
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
      <base-button class="ui button" @click.prevent="addRecipe">
        Add
      </base-button>
      <base-button class="ui button" alert @click.prevent="discardRecipe">
        Discard
      </base-button>
    </div>
    <div v-if="message">
      <p>{{ message }}</p>
    </div>
  </form>
</template>

<script>
import dotenv from 'dotenv'
import axios from 'axios'

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
      message: null
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
    addRecipe() {
      const data = {
        firebaseId: this.$store.getters.user,
        title: this.recipe.title,
        ingredients: this.recipe.ingredients,
        imageURL: this.recipe.imageURL,
        description: this.recipe.description,
        details: {
          categories: this.recipe.details.categories,
          qualities: this.recipe.details.qualities,
          timeToCook: this.recipe.details.timeToCook
        }
      }
      //Refactor to axios
      fetch(`${process.env.VUE_APP_MY_URL}recipes/recipe/add-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            this.message = 'Recipe added!'
            this.recipe = {
              title: '',
              ingredients: [],
              description: '',
              details: {
                categories: [],
                qualities: [],
                timeToCook: 'About 15 min'
              }
            }
          } else {
            this.message = 'Could not add recipe :('
          }
        })
        .catch(_err => {
          this.message = 'Something went wrong :('
        })
    },
    discardRecipe() {
      this.ingredient = ''
      this.recipe = {
        title: '',
        ingredients: [],
        description: '',
        details: {
          categories: [],
          qualities: [],
          timeToCook: 'About 15 min'
        }
      }
    },
    handleFileUpload() {
      const image = this.$refs.image.files[0]
      const formData = new FormData()
      formData.append('image', image)
      axios
        .post(
          `${process.env.VUE_APP_MY_URL}recipes/recipe/add-image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(response => {
          this.recipe.imageURL = response.data.src
        })
        .catch(error => console.log(error.response.data.message))
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
