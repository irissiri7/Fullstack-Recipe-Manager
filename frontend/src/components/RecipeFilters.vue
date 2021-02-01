<template>
  <base-card>
    <h2>Select filters</h2>
    <h4>Category</h4>
    <div
      class="ui checkbox"
      v-for="category in recipeDetailOptions.categories"
      :key="category"
    >
      <input
        type="checkbox"
        :value="category.toLowerCase()"
        v-model="selectedCategories"
        @change="filtering"
      />
      <label>{{ category }}</label>
    </div>
    <h4>Quality</h4>
    <div
      class="ui checkbox"
      v-for="quality in recipeDetailOptions.qualities"
      :key="quality"
    >
      <input
        type="checkbox"
        :value="quality.toLowerCase()"
        v-model="selectedQualities"
        @change="filtering"
      />
      <label>{{ quality }}</label>
    </div>
    <h4>Time to cook</h4>
    <div
      class="ui radio checkbox"
      v-for="option in recipeDetailOptions.timeToCook"
      :key="option"
    >
      <input
        type="radio"
        :value="option"
        v-model="selectedTimeToCook"
        @change="filtering"
      />
      <label>{{ option }}</label>
    </div>

    <div class="flex clear-btn-cnt">
      <base-button class="compact mini alert" @click="clearFilters"
        >Clear filters</base-button
      >
    </div>
  </base-card>
</template>

<script>
export default {
  inject: ['recipeDetailOptions'],
  props: {
    selectedFilters: {
      type: Object,
      required: true
    }
  },
  emits: ['filtering'],
  data() {
    return {
      selectedCategories: [],
      selectedQualities: [],
      selectedTimeToCook: ''
    }
  },
  created() {
    this.selectedCategories = this.selectedFilters.categories
    this.selectedQualities = this.selectedFilters.qualities
    this.selectedTimeToCook = this.selectedFilters.timeToCook
  },
  methods: {
    filtering() {
      const searchparams = new URLSearchParams()
      this.selectedCategories.map(category => {
        searchparams.append('categories[]', category)
      })
      this.selectedQualities.map(quality => {
        searchparams.append('qualities[]', quality)
      })
      if (this.selectedTimeToCook) {
        searchparams.append('timeToCook', this.selectedTimeToCook)
      }
      this.$emit('filtering', {
        query: searchparams.toString(),
        selectedFilters: {
          categories: this.selectedCategories,
          qualities: this.selectedQualities,
          timeToCook: this.selectedTimeToCook
        }
      })
    },
    clearFilters() {
      this.selectedCategories = []
      this.selectedQualities = []
      this.selectedTimeToCook = ''
      this.filtering()
    }
  }
}
</script>

<style scoped>
.ui.checkbox {
  margin-left: 5px;
}
.clear-btn-cnt {
  justify-content: flex-end;
}
</style>
