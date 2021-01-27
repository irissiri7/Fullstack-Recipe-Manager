<template>
  <base-card>
    <transition name="fade">
      <base-modal v-if="showModal" @user-selection="deleteRecipe">
        <template v-slot:title>
          <h3>Are you sure you want to delete the recipe?</h3>
        </template>
        <template v-slot:content>
          <p>This action can not be undone</p>
        </template>
      </base-modal>
    </transition>
    <div v-if="showCompact" class="flex-cnt">
      <h2>{{ recipe.title }}</h2>
      <div class="icon-btn-cnt">
        <base-button class="icon" @click="editRecipe">
          <i class="pencil icon"></i>
        </base-button>
        <base-button class="icon alert" @click="showModal = true">
          <i class="trash icon"></i>
        </base-button>
      </div>
    </div>
    <base-image v-if="showCompact" :src="src" alt="dish" />
    <base-image v-else :src="src" alt="dish" :height="20" />

    <h3>Ingredients</h3>
    <div v-bind:class="{ 'fade-box': showCompact }">
      <ul>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
      <div v-if="showCompact" class="fade-box read-more"></div>
    </div>
    <h3>Description</h3>
    <div :class="['description', { 'fade-box': showCompact }]">
      <p id="description">{{ recipe.description }}</p>
      <div v-if="showCompact" class="fade-box read-more"></div>
    </div>
    <h3 v-if="!showCompact">Details</h3>
    <div v-if="!showCompact">
      <h4>Category</h4>
      <a
        v-for="category in recipe.details.categories"
        :key="category"
        class="ui circular label"
        :class="randomizeColor()"
        >{{ category }}</a
      >
      <h4>Qualities</h4>
      <div>
        <a
          v-for="quality in recipe.details.qualities"
          :key="quality"
          class="ui circular label"
          :class="randomizeColor()"
          >{{ quality }}</a
        >
      </div>
      <h4>Time to cook</h4>
      <p>{{ recipe.details.timeToCook }}</p>
    </div>
    <div v-if="showCompact" class="flex center">
      <base-button @click="showDetails">
        Show Recipe
      </base-button>
    </div>
    <div v-if="!showCompact" class="flex float-right">
      <base-button @click="editRecipe">
        Edit
      </base-button>
      <base-button class="alert" @click="showModal = true">
        Delete
      </base-button>
    </div>
  </base-card>
</template>

<script>
import client from '../util/Client.js'

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
  emits: ['deleted-recipe'],
  data() {
    return {
      showModal: false
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
    async deleteRecipe(confirmed) {
      this.showModal = false
      if (!confirmed) return
      try {
        await client.deleteRecipe(this.recipe._id)
        this.$emit('deleted-recipe')
      } catch (error) {
        console.log(error)
      }
    },
    randomizeColor() {
      const colorOptions = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink'
      ]
      return colorOptions[Math.floor(Math.random() * colorOptions.length)]
    }
  }
}
</script>
<style scoped>
@import '../assets/keyframes.css';

h2 {
  word-break: break-word;
}
.icon-btn-cnt {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
}
.description {
  word-break: break-word;
}
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

.float-right {
  justify-content: flex-end;
  margin-top: 15px;
}
#description {
  white-space: pre-wrap;
}

.fade-enter-active {
  animation: fade 0.5s ease;
}
.fade-leave-active {
  animation: fade 0.5s ease reverse;
}
</style>
