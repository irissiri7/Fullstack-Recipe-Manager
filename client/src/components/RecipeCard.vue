<template>
  <div class="card">
    <div v-if="showCompact" class="flex-cnt">
      <h2>{{ recipe.title }}</h2>
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
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
          {{ ingredient }}
        </li>
      </ul>
      <div v-if="showCompact" class="fade-box read-more"></div>
    </div>
    <h3>Description</h3>
    <div v-bind:class="{ 'fade-box': showCompact }">
      <p>{{ recipe.description }}</p>
      <div v-if="showCompact" class="fade-box read-more"></div>
    </div>
    <h3 v-if="!showCompact">Details</h3>
    <div v-if="!showCompact">
      <h4>Category</h4>
      <a
        v-for="category in recipe.details.categories"
        :key="category"
        class="ui blue circular label"
        >{{ category }}</a
      >
      <h4>Qualities</h4>
      <div>
        <a
          v-for="quality in recipe.details.qualities"
          :key="quality"
          class="ui red circular label"
          >{{ quality }}</a
        >
      </div>
      <h4>Time to cook</h4>
      <p>{{ recipe.detail.timeToCook }}</p>
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
      default: false
    },
    recipe: {
      type: Object
    }
  },
  methods: {
    showDetails() {
      this.$router.push('/my-recipes/recipe-id')
    }
  }
}
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
