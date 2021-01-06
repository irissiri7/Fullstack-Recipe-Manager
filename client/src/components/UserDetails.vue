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
  <base-feedback-card v-if="feedback.message" :style="feedback.style">
    {{ feedback.message }}
  </base-feedback-card>
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
          <base-button
            class="full-width"
            @click.prevent="updateUserDetails"
            :class="{ disabled: !hasChanges }"
            >Save Changes</base-button
          >
        </div>
        <div class="field">
          <base-button
            class="full-width"
            mode="alert"
            @click.prevent="showModal = true"
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
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      foodPreferences: this.user.foodPreferences,
      numberOfRecipes: null,
      feedback: {
        message: null,
        style: null
      },
      showModal: false
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    profilePictureFile: {
      type: Object,
      required: true
    },
    changedProfilePicture: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    hasChanges() {
      if (this.firstName !== this.user.firstName) return true
      if (this.lastName !== this.user.lastName) return true

      let arr1 = this.foodPreferences.slice()
      let arr2 = this.user.foodPreferences.slice()
      if (arr1.sort().join(',') !== arr2.sort().join(',')) return true

      if (this.changedProfilePicture) return true

      return false
    }
  },
  methods: {
    async updateUserDetails() {
      try {
        const formData = new FormData()
        const newData = {
          firebaseId: this.$store.getters.firebaseId,
          foodPreferences: this.foodPreferences,
          firstName: this.firstName,
          lastName: this.lastName
        }
        formData.append('user-details', JSON.stringify(newData))
        if (this.profilePictureFile) {
          formData.append('image', this.profilePictureFile)
        }
        await axios.post(
          `${process.env.VUE_APP_MY_URL}users/user/update-user-details/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.feedback.style = 'informational'
        this.feedback.message = 'Changes saved!'
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
    handleUserSelection(confirmed) {
      this.showModal = false
      if (confirmed) this.deleteProfile()
    },
    async deleteProfile() {
      try {
        await axios.delete(
          `${process.env.VUE_APP_MY_URL}users/user/delete-user/?firebaseId=${this.$store.getters.firebaseId}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.$store.dispatch('signOut')
        this.$router.push('/')
      } catch (error) {
        console.log(error.response.data)
      }
    }
  },
  created() {
    this.getNumberOfRecipes()
    console.log(this.profilePictureFile)
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}

.modal-enter-active {
  animation: modal 0.3s ease;
}
.modal-leave-active {
  animation: modal 0.3s ease reverse;
}

@keyframes modal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
