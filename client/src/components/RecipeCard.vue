<template>
  <div class="card">
    <div v-if="showCompact" class="flex-cnt">
      <h2>Mumisg Gryta</h2>
      <div>
        <button
          class="ui icon button"
          @click.prevent="
            this.$router.push('/my-recipes/edit-recipe/placeholder')
          "
        >
          <i class="pencil alternate icon inverted"></i>
        </button>
        <button class="ui icon button">
          <i class="trash icon inverted"></i>
        </button>
      </div>
    </div>
    <div class="img-cnt">
      <img
        src="https://i.pinimg.com/originals/d6/aa/ba/d6aabaa757b4abbea1d739bd849795e6.jpg"
        alt="dish"
      />
    </div>
    <h3>Ingredients</h3>
    <div v-bind:class="{ 'fade-box': showCompact }">
      <ul>
        <li>Ingredient 1</li>
        <li>Ingredient 2</li>
        <li>Ingredient 3</li>
      </ul>
      <div v-if="showCompact" class="fade-box read-more"></div>
    </div>
    <h3>Description</h3>
    <div v-bind:class="{ 'fade-box': showCompact }">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
        praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero
        sint magnam placeat corrupti laborum, sit adipisci vero, quaerat
        excepturi ipsam ipsa soluta.Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Esse, praesentium maiores? Nihil dicta, quasi
        praesentium reprehenderit libero sint magnam placeat corrupti laborum,
        sit adipisci vero, quaerat excepturi ipsam ipsa soluta.Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Esse, praesentium maiores? Nihil
        dicta, quasi praesentium reprehenderit libero sint magnam placeat
        corrupti laborum, sit adipisci vero, quaerat excepturi ipsam ipsa
        soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
        praesentium maiores? Nihil dicta, quasi praesentium reprehenderit libero
        sint magnam placeat corrupti laborum, sit adipisci vero, quaerat
        excepturi ipsam ipsa soluta.
      </p>
      <div v-if="showCompact" class="fade-box read-more"></div>
    </div>
    <h3 v-if="!showCompact">Details</h3>
    <div v-if="!showCompact">
      <h4>Category</h4>
      <a class="ui blue circular label">Dinner</a>
      <h4>Qualities</h4>
      <div>
        <a class="ui red circular label">Gluten free</a>
        <a class="ui olive circular label">Vegetarian</a>
      </div>
      <h4>Time to cook</h4>
      <p>About 30min</p>
    </div>
    <div v-if="showCompact" class="flex center">
      <button class="ui button" @click.prevent="showDetails">
        Show Recipe
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showCompact: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    showDetails() {
      this.$router.push("/my-recipes/recipe-id");
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

.flex-cnt {
  display: flex;
  justify-content: space-between;
}
.ui.circular.label {
  cursor: default;
}
</style>
