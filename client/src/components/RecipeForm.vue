<template>
  <form class="ui form">
    <h4 class="ui dividing header">Recipe Name</h4>
    <div class="field">
      <input
        type="text"
        name="first-name"
        placeholder="Recipe Name"
        v-model="title"
      />
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
      <textarea v-model="description"></textarea>
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
</template>

<script>
export default {
  data() {
    return {
      title: "",
      src:
        "https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg",
      ingredient: "",
      ingredients: [],
      description: "",
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.title = "Mumsig gryta";
      (this.src =
        "https://i.pinimg.com/originals/d6/aa/ba/d6aabaa757b4abbea1d739bd849795e6.jpg"),
        (this.ingredients = ["Banana", "Apple", "Potatoe"]),
        (this.description =
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit liberosint magnam placeat corrupti laborum, sit adipisci vero, quaeratexcepturi ipsam ipsa soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero sint magnam placeat corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero sint magnam placeat corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero sint magnam placeat corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa soluta.");
    }
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
ul {
  list-style: none;
}
.full-width {
  width: 100%;
}
</style>
