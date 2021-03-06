<template>
  <transition name="modal">
    <base-modal v-if="showModal" @user-selection="handleUserSelection">
      <template v-slot:title>
        <h3>Are you sure you want to delete your profile?</h3>
      </template>
      <template v-slot:content>
        <p>This action can not be undone</p>
      </template>
    </base-modal>
  </transition>
  <transition name="feedback">
    <base-feedback-card v-if="feedback.message" :mode="feedback.mode">
      {{ feedback.message }}
    </base-feedback-card>
  </transition>
  <form class="ui form">
    <h4 class="ui dividing header">Summary</h4>
    <div class="field">
      <p v-if="numberOfRecipes >= 0">
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
            v-model.trim="firstName"
          />
        </div>
        <div class="field">
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            v-model.trim="lastName"
          />
        </div>
      </div>
    </div>
    <h4 class="ui dividing header">Food Preferences</h4>
    <div class="field">
      <div class="fields">
        <div class="field">
          <div class="ui checkbox">
            <input
              type="checkbox"
              value="vegetarian"
              v-model="foodPreferences"
            />
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
    </div>

    <div class="field">
      <div class="two fields">
        <div class="field">
          <base-button
            class="full-width"
            @click.prevent="updateUserDetails"
            :class="{ disabled: !hasChanges }"
            >Save Changes</base-button
          >
        </div>
        <div class="field">
          <base-button
            class="full-width alert"
            @click.prevent="showModal = true"
            >Delete Profile</base-button
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import client from '../util/Client.js'
import services from '../util/services.js'
import feedback from '../mixins/feedback.js'

export default {
  mixins: [feedback],
  props: {
    currentProps: {
      type: Object,
      required: true
    }
  },
  /* eslint-disable vue/custom-event-name-casing */
  emits: ['userUpdated'],
  data() {
    return {
      firstName: this.currentProps.user.firstName,
      lastName: this.currentProps.user.lastName,
      foodPreferences: this.currentProps.user.foodPreferences,
      numberOfRecipes: null,
      showModal: false
    }
  },
  computed: {
    hasChanges() {
      if (this.firstName !== this.currentProps.user.firstName) return true
      if (this.lastName !== this.currentProps.user.lastName) return true
      if (
        !services.arrayContentIsSame(
          this.foodPreferences,
          this.currentProps.user.foodPreferences
        )
      )
        return true
      if (this.currentProps.changedProfilePicture) return true

      return false
    }
  },
  created() {
    this.getNumberOfRecipes()
  },
  methods: {
    constructFormData() {
      const formData = new FormData()
      const newData = {
        firebaseId: this.$store.getters.firebaseId,
        foodPreferences: this.foodPreferences,
        firstName: this.firstName,
        lastName: this.lastName
      }
      formData.append('user-details', JSON.stringify(newData))
      if (this.currentProps.profilePictureFile) {
        formData.append('image', this.currentProps.profilePictureFile)
      }
      return formData
    },
    async updateUserDetails() {
      try {
        const userData = this.constructFormData()
        await client.updateUserDetails(userData)
        this.displayFeedback('Changes saved!')
        this.$emit('userUpdated')
      } catch (error) {
        this.displayFeedback('Could not update user information', 'error')
        console.log(error)
      }
    },
    async getNumberOfRecipes() {
      try {
        const data = await client.getRecipes()
        this.numberOfRecipes = data.length
      } catch (error) {
        console.log(error)
      }
    },
    handleUserSelection(confirmed) {
      this.showModal = false
      if (confirmed) this.deleteProfile()
    },
    async deleteProfile() {
      try {
        await client.deleteProfile()
        this.$store.dispatch('signOut', { route: '/' })
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/keyframes.css';
.ui.form {
  margin-top: 1.5rem;
}
.fields {
  flex-wrap: wrap;
}
.full-width {
  width: 100%;
}

/* Transitions */
.modal-enter-active {
  animation: fade 0.5s ease;
}
.modal-leave-active {
  animation: fade 0.5s ease reverse;
}

.feedback-enter-active {
  animation: fade 0.5s ease;
}
.feedback-leave-active {
  animation: fade 0.5s ease reverse;
}
</style>
