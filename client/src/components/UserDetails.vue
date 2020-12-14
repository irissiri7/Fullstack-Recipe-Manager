<template>
  <base-dialog-card v-if="feedback.message" :style="feedback.style">
    {{ feedback.message }}
  </base-dialog-card>
  <form class="ui form" @submit.prevent="updateUserDetails">
    <h4 class="ui dividing header">Summary</h4>
    <div class="field">
      <p v-if="numberOfRecipes">
        You currently have {{ numberOfRecipes }} recipe(s) in your recipe bank
      </p>
      <p v-else>
        Could not get recipe statistics
      </p>
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
import BaseDialogCard from './ui/BaseDialogCard.vue'

export default {
  components: { BaseDialogCard },
  data() {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      foodPreferences: this.user.foodPreferences,
      numberOfRecipes: null,
      feedback: {
        message: null,
        style: null
      }
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    profilePictureURL() {
      return this.user.profilePictureURL
    }
  },
  methods: {
    async updateUserDetails() {
      try {
        const newData = {
          firebaseId: this.$store.getters.firebaseId,
          foodPreferences: this.foodPreferences,
          firstName: this.firstName,
          lastName: this.lastName,
          profilePictureURL: this.profilePictureURL
        }
        await axios.post(
          `${process.env.VUE_APP_MY_URL}users/user/update-user-details/`,
          newData,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.feedback.style = 'informational'
        this.feedback.message = 'Update successful!'
        this.$emit('updated-user')
      } catch (error) {
        this.feedback.style = 'error'
        this.feedback.message = 'Could not update user information'
        console.log(error)
      }
    },
    async getNumberOfRecipes() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_MY_URL}recipes/get-recipes/?firebaseId=${this.$store.getters.firebaseId}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.numberOfRecipes = response.data.length
      } catch (error) {
        console.log(error)
      }
    },
    deleteProfile() {
      console.log('Deleting profile :(')
    }
  },
  created() {
    this.getNumberOfRecipes()
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
