<template>
  <form class="ui form">
    <h3 class="ui dividing header">Recipe Name</h3>
    <div class="field">
      <input
        type="text"
        name="first-name"
        placeholder="Recipe Name"
        v-model.trim="title"
      />
    </div>
    <h3 class="ui dividing header">Image</h3>
    <div class="field">
      <div class="img-cnt">
        <img :src="src" />
      </div>
    </div>
    <div class="field">
      <button class="ui icon button">
        Upload image
        <i class="upload icon"></i>
      </button>
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
          <button class="ui button full-width" @click.prevent="addIngredient">
            Add
          </button>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="ingredient in ingredients" v-bind:key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <h3 class="ui dividing header">Description</h3>
    <div class="field">
      <textarea v-model="description"></textarea>
    </div>
    <h3 class="ui dividing header">Details</h3>
    <h4>Category</h4>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" value="breakfast" v-model="categories" />
        <label>Breakfast</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="lunch" v-model="categories" />
        <label>Lunch</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="dinner" v-model="categories" />
        <label>Dinner</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="starter" v-model="categories" />
        <label>Starter</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="dessert" v-model="categories" />
        <label>Dessert</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="other" v-model="categories" />
        <label>Other</label>
      </div>
    </div>
    <h4>Quality</h4>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" value="gluten free" v-model="qualities" />
        <label>Gluten Free</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="lactose free" v-model="qualities" />
        <label>Lactose Free</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="vegetarian" v-model="qualities" />
        <label>Vegetarian</label>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" value="vegan" v-model="qualities" />
        <label>Vegan</label>
      </div>
    </div>
    <h4>Time to cook</h4>
    <div class="field">
      <div class="ui radio checkbox">
        <input type="radio" value="About 15 min" v-model="timeToCook" />
        <label>About 15 min</label>
      </div>
      <div class="ui radio checkbox">
        <input type="radio" value="About 30 min" v-model="timeToCook" />
        <label>About 30 min</label>
      </div>
      <div class="ui radio checkbox">
        <input type="radio" value="60 min or more" v-model="timeToCook" />
        <label>60 min or more</label>
      </div>
    </div>
    <div class="field">
      <button class="ui button" @click.prevent="addRecipe">
        Add
      </button>
      <button class="ui button" @click.prevent="">
        Discard
      </button>
    </div>
    <div v-if="message">
      <p>{{ message }}</p>
    </div>
  </form>
</template>

<script>
import dotenv from 'dotenv'

dotenv.config()

export default {
  data() {
    return {
      title: '',
      src:
        'https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg',
      ingredient: '',
      ingredients: [],
      description: '',
      categories: [],
      qualities: [],
      timeToCook: '',
      message: null
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.title = 'Mumsig gryta'
      this.src =
        'https://i.pinimg.com/originals/d6/aa/ba/d6aabaa757b4abbea1d739bd849795e6.jpg'
      this.ingredients = ['Banana', 'Apple', 'Potatoe']
      this.description =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit liberosint magnam placeat corrupti laborum, sit adipisci vero, quaeratexcepturi ipsam ipsa soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero sint magnam placeat corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero sint magnam placeat corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero sint magnam placeat corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa soluta.'
    }
  },
  methods: {
    addIngredient() {
      if (this.ingredient != '') {
        this.ingredients.push(this.ingredient)
        this.ingredient = ''
      }
    },
    addRecipe() {
      const data = {
        userId: this.$store.getters.user,
        title: this.title,
        ingredients: this.ingredients,
        description: this.description,
        details: {
          categories: this.categories,
          qualities: this.qualities,
          timeToCook: this.timeToCook
        }
      }
      fetch(`${process.env.VUE_APP_MY_URL}recipes/recipe/add-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          response.ok
            ? (this.message = 'Recipe added!')
            : (this.message = 'Could not add recipe :(')
        })
        .catch(_err => {
          this.message = 'Something went wrong :('
        })
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
</style>
