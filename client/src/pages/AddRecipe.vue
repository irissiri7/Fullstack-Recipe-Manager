<template>
  <div class="card">
    <h1>New Recipe</h1>
    <form class="ui form">
      <h4 class="ui dividing header">Recipe Name</h4>
      <div class="field">
        <input type="text" name="first-name" placeholder="Recipe Name" />
      </div>
      <h4 class="ui dividing header">Image</h4>
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
      <h4 class="ui dividing header">Ingredients</h4>
      <div class="field">
        <div class="fields">
          <div class="twelve wide field">
            <input
              type="text"
              name="ingredient"
              placeholder="Add ingredients"
              v-model="ingredient"
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
      <h4 class="ui dividing header">Description</h4>
      <div class="field">
        <textarea></textarea>
      </div>
      <div class="field">
        <button class="ui button" @click.prevent="">
          Add
        </button>
        <button class="ui button" @click.prevent="">
          Discard
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ingredients: [],
      ingredient: "",
      src:
        "https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg",
    };
  },
  methods: {
    addIngredient() {
      if (this.ingredient != "") {
        this.ingredients.push(this.ingredient);
        this.ingredient = "";
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: var(--main-coffee);
}
ul {
  list-style: none;
}
.full-width {
  width: 100%;
}
</style>
