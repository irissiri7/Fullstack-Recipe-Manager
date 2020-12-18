<template>
  <base-card>
    <base-dialog-card v-if="feedback.message" :style="feedback.style">
      {{ feedback.message }}
    </base-dialog-card>
    <h1>Sign In</h1>
    <form class="ui form" @submit.prevent="signIn">
      <div class="field">
        <label>Email</label>
        <div class="field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
        <label>Password</label>
        <div class="field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
      </div>
      <div class="field">
        <base-button class="same-width">Sign In</base-button>
      </div>
      <div class="field">
        <div class="flex corner">
          <base-button @click="resetPassword" mode="link"
            >Forgot password?</base-button
          >
          <div class="flex">
            <p>Not a user?</p>
            <base-button link to="/sign-up">Sign Up</base-button>
          </div>
        </div>
      </div>
    </form>
  </base-card>
</template>

<script>
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export default {
  data() {
    return {
      email: 'dwight@example.com',
      password: '111111',
      feedback: {
        message: null,
        style: null
      }
    }
  },
  methods: {
    signIn() {
      this.$store
        .dispatch('signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/home')
        })
        .catch(_error => {
          this.feedback.message = 'Could not sign in. Check your credentials.'
          this.feedback.style = 'error'
        })
    },
    async resetPassword() {
      try {
        await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
          { email: 'lydia.lind@hey.com', requestType: 'PASSWORD_RESET' }
        )
        this.feedback.style = 'informatonal'
        this.feedback.message =
          'A password reset mail has been sent, check your inbox'
      } catch (error) {
        this.feedback.style = 'error'
        this.feedback.message =
          'Something went wrong, could not send password reset mail'
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: var(--main-coffee);
}
p {
  margin: 0px 5px 0px 0px;
}
.same-width {
  width: 7rem;
}
</style>
