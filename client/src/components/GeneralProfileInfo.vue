<template>
  <form class="ui form" @submit.prevent="updateProfile">
    <h4 class="ui dividing header">Summary</h4>
    <div class="field">
      <p>You currently have {{ numberOfRecipes }} recipes</p>
    </div>
    <h4 class="ui dividing header">Personal Information</h4>
    <div class="field">
      <label>Name</label>
      <div class="two fields">
        <div class="field">
          <input
            type="text"
            name="first-name"
            placeholder="First Name"
            v-model="firstName"
          />
        </div>
        <div class="field">
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            v-model="lastName"
          />
        </div>
      </div>
    </div>
    <h4 class="ui dividing header">Food Preferences</h4>
    <div class="fields">
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" value="vegetarian" v-model="foodPreferences" />
          <label>Vegetarian</label>
        </div>
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" value="vegan" v-model="foodPreferences" />
          <label>Vegan</label>
        </div>
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input
            type="checkbox"
            value="lactose free"
            v-model="foodPreferences"
          />
          <label>Lactose Free</label>
        </div>
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input
            type="checkbox"
            value="gluten free"
            v-model="foodPreferences"
          />
          <label>Gluten Free</label>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="two fields">
        <div class="field">
          <base-button class="full-width">Update Profile</base-button>
        </div>
        <div class="field">
          <base-button class="full-width" alert @click.prevent="deleteProfile"
            >Delete Profile</base-button
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      numberOfRecipes: 50,
      foodPreferences: null
    }
  },
  methods: {
    updateProfile() {
      console.log('Updating Profile!')
    },
    deleteProfile() {
      console.log('Deleting profile :(')
    },
    async fetchData() {
      console.log('fetching data')
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_MY_URL}users/user/get-user-details/?firebaseId=${this.$store.getters.firebaseId}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        const data = response.data
        data.firstName && (this.firstName = data.firstName)
        data.lastName && (this.lastName = data.lastName)
        data.foodPreferences && (this.foodPreferences = data.foodPreferences)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
