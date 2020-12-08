<template>
  <base-card>
    <div v-if="showCompact" class="flex-cnt">
      <h2>{{ recipe.title }}</h2>
      <div>
        <base-button class="ui icon button" @click.prevent="editRecipe">
          <i class="pencil alternate icon inverted"></i>
        </base-button>
        <base-button class="ui icon button" alert @click.prevent="deleteRecipe">
          <i class="trash icon inverted"></i>
        </base-button>
      </div>
    </div>
    <div class="img-cnt">
      <img :src="src" alt="dish" />
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
      <p>{{ recipe.details.timeToCook }}</p>
    </div>
    <div v-if="showCompact" class="flex center">
      <base-button @click.prevent="showDetails">
        Show Recipe
      </base-button>
    </div>
    <div v-if="!showCompact" class="flex float-right">
      <base-button class="ui icon button" alert @click.prevent="deleteRecipe">
        Delete
      </base-button>
    </div>
  </base-card>
</template>

<script>
import service from '../util/services.js'
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
  computed: {
    src() {
      return this.recipe.imageURL
        ? this.recipe.imageURL
        : 'https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg'
    }
  },
  methods: {
    showDetails() {
      this.$router.push(`/my-recipes/${this.recipe._id}`)
    },
    editRecipe() {
      this.$router.push(`/my-recipes/edit-recipe/${this.recipe._id}`)
    },
    async deleteRecipe() {
      const success = await service.deleteRecipe(this.recipe._id)
      if (success) {
        this.$emit('deleted-recipe')
      } else {
        console.log('could not delete recipe')
      }
    }
  }
}
</script>

<style scoped>
.fade-box {
  max-height: 100px;
  position: relative;
  overflow: hidden;
}

.fade-box .read-more {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  height: 50%;
  background-image: linear-gradient(to bottom, transparent, white);
}

.flex-cnt {
  display: flex;
  justify-content: space-between;
}
.ui.circular.label {
  cursor: default;
}
i:hover {
  color: var(--main-pine);
}
.trash.icon.inverted:hover {
  color: var(--main-alert);
}
.float-right {
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
