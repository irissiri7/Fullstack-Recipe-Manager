<template>
  <base-card>
    <h2>Select filters</h2>
    <h4>Category</h4>
    <div class="field">
      <div class="ui checkbox" v-for="category in categories" :key="category">
        <input
          type="checkbox"
          :value="category.toLowerCase()"
          v-model="selectedCategories"
          @change="filtering"
        />
        <label>{{ category }}</label>
      </div>
      <h4>Quality</h4>
      <div class="ui checkbox" v-for="quality in qualities" :key="quality">
        <input
          type="checkbox"
          :value="quality.toLowerCase()"
          v-model="selectedQualities"
          @change="filtering"
        />
        <label>{{ quality }}</label>
      </div>
      <h4>Time to cook</h4>
      <div class="ui radio checkbox" v-for="option in timeToCook" :key="option">
        <input
          type="radio"
          :value="option"
          v-model="selectedTimeToCook"
          @change="filtering"
        />
        <label>{{ option }}</label>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['filtering'],
  data() {
    return {
      categories: [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Starter',
        'Dessert',
        'Other'
      ],
      qualities: ['Gluten free', 'Lactose free', 'Vegetarian', 'Vegan'],
      timeToCook: ['About 15 min', 'About 30 min', '60 min or more'],
      selectedCategories: [],
      selectedQualities: [],
      selectedTimeToCook: ''
    }
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
      this.$emit('filtering', searchparams.toString())
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid rgba(158, 155, 155, 0.76);
  border-radius: 5px;
  margin-bottom: 10px;
}

.ui.checkbox {
  margin-left: 5px;
}
</style>
