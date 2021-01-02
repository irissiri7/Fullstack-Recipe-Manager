<template>
  <base-card>
    <base-dialog-card v-if="feedback.message" :style="feedback.style">
      {{ feedback.message }}
    </base-dialog-card>
    <h1 v-if="mode == 'sign in'">Sign In</h1>
    <h1 v-if="mode == 'sign up'">Sign Up</h1>
    <h1 v-if="mode == 'reset password'">Reset Password</h1>
    <form class="ui form" @submit.prevent="submitForm">
      <div class="field">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="name@email.com"
          required
        />
      </div>
      <div class="field" v-if="mode == 'sign up' || mode == 'sign in'">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password"
          minlength="6"
          required
        />
      </div>
      <div class="field" v-if="mode == 'sign up'">
        <label>Confirm password</label>
        <input
          v-model="confirmedPassword"
          type="password"
          name="confirmedPassword"
          placeholder="Confirm Password"
          minlength="6"
          required
        />
      </div>
      <div class="field" v-if="mode == 'sign in'">
        <base-button
          type="submit"
          class="same-width"
          :class="{ disabled: !validForm }"
          >Sign In</base-button
        >
      </div>
      <div class="field" v-if="mode == 'sign up'">
        <div class="ui checkbox">
          <input type="checkbox" name="example" v-model="acceptsTermsOfUse" />
          <label>I agree to terms of use</label>
        </div>
      </div>
      <div class="field" v-if="mode == 'sign up'">
        <base-button type="submit" :class="{ disabled: !validForm }">
          Sign Up
        </base-button>
      </div>
      <div class="field" v-if="mode == 'reset password'">
        <base-button type="submit" :class="{ disabled: !validForm }">
          Reset Password
        </base-button>
      </div>
      <div class="field" v-if="mode == 'sign up' || mode == 'reset password'">
        <base-button type="button" mode="link" @click="mode = 'sign in'"
          >Back to log in</base-button
        >
      </div>
      <div class="field" v-if="mode == 'sign in'">
        <div class="flex corner">
          <base-button
            type="button"
            mode="link"
            @click="mode = 'reset password'"
            >Forgot password?</base-button
          >
          <div class="flex" v-if="mode == 'sign in'">
            <p>Not a user?</p>
            <base-button type="button" mode="link" @click="mode = 'sign up'"
              >Sign Up</base-button
            >
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
      mode: 'sign in',
      email: 'dwight@example.com',
      password: '111111',
      confirmedPassword: null,
      acceptsTermsOfUse: false,
      feedback: {
        message: null,
        style: null
      }
    }
  },
  computed: {
    validForm() {
      if (this.mode == 'sign in') {
        return !!this.email && this.password
      } else if (this.mode == 'sign up') {
        return (
          this.email &&
          this.password &&
          this.confirmedPassword &&
          this.acceptsTermsOfUse &&
          this.password === this.confirmedPassword
        )
      } else if (this.mode == 'reset password') {
        return !!this.email
      } else {
        return false
      }
    }
  },
  methods: {
    submitForm() {
      if (this.mode == 'sign in') this.signIn()
      else if (this.mode == 'sign up') this.signUp()
      else if (this.mode == 'reset password') this.resetPassword()
      else return
    },
    signIn() {
      console.log('sign in')
      this.$store
        .dispatch('signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/home')
        })
        .catch(error => {
          console.log(error)
          this.feedback.message = 'Could not sign in. Check your credentials.'
          this.feedback.style = 'error'
        })
    },
    signUp() {
      console.log('sign up')
      this.$store
        .dispatch('signUp', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.feedback.style = 'informational'
          this.feedback.message =
            'Sign up successful! You are now welcome to sign in'
          ;(this.email = ''),
            (this.password = ''),
            (this.confirmedPassword = ''),
            (this.acceptsTermsOfUse = false),
            (this.mode = 'sign in')
        })
        .catch(_error => {
          this.feedback.style = 'error'
          this.feedback.message =
            'Something went wrong :( ... Could not sign up new user'
        })
    },
    async resetPassword() {
      try {
        await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
          { email: this.email, requestType: 'PASSWORD_RESET' }
        )
        this.feedback.style = 'informational'
        this.feedback.message =
          'A password reset mail has been sent, check your inbox'
        this.email = ''
      } catch (error) {
        console.log(error)
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
