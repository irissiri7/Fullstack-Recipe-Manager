<template>
  <base-card>
    <transition name="feedback">
      <base-feedback-card v-if="feedback.message" :mode="feedback.mode">
        {{ feedback.message }}
      </base-feedback-card>
    </transition>
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
          @keydown.space.prevent
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
          @keydown.space.prevent
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
          @keydown.space.prevent
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
          <label
            >I agree to
            <base-button
              type="button"
              class="link"
              @click="showTerms = !showTerms"
              >terms of use</base-button
            >
          </label>
        </div>
      </div>
      <div class="field" v-if="showTerms && mode == 'sign up'">
        <p>
          Recipe Manager is a website created primarily for educational
          purposes. It might be taken down in the near future.
        </p>
        <br />
        <p>
          By creating an account you agree that we save information related to
          you as a user. You can delete your account at any time.
        </p>
        <br />
        <p>Recipe Manager is 100% free of charge.</p>
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
        <base-button
          type="button"
          class="link"
          @click=";(mode = 'sign in'), (showTerms = false)"
          >Back to sign in</base-button
        >
      </div>
      <div class="field" v-if="mode == 'sign in'">
        <div class="flex corner">
          <base-button
            type="button"
            class="link"
            @click="mode = 'reset password'"
            >Forgot password?</base-button
          >
          <div class="flex" v-if="mode == 'sign in'">
            <p>Not a user?</p>
            <base-button type="button" class="link" @click="mode = 'sign up'"
              >Sign Up</base-button
            >
          </div>
        </div>
      </div>
    </form>
  </base-card>
</template>

<script>
import dotenv from 'dotenv'
import client from '../util/Client.js'
import services from '../util/services.js'
import feedback from '../mixins/feedback.js'

dotenv.config()

export default {
  mixins: [feedback],
  data() {
    return {
      mode: 'sign in',
      email: '',
      password: '',
      showTerms: false,
      confirmedPassword: null,
      acceptsTermsOfUse: false
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
      if (this.mode == 'sign in') this.authenticate('sign in')
      else if (this.mode == 'sign up') this.authenticate('sign up')
      else if (this.mode == 'reset password') this.resetPassword()
      else return
    },
    async authenticate(mode) {
      try {
        const data = await client.authenticate(this.email, this.password, mode)
        const user = {
          firebaseId: data.localId,
          token: data.idToken,
          refreshToken: data.refreshToken,
          email: data.email
        }
        services.setUserInLocalStorage(user)
        await this.$store.dispatch('setUser', user)
        this.$router.push('/home')
      } catch (error) {
        this.displayFeedback(
          `Could not ${mode}. Check your credentials.`,
          'error'
        )
        console.log(error)
      }
    },
    async resetPassword() {
      try {
        await client.resetPassword(this.email)
        this.displayFeedback(
          'A password reset mail has been sent, check your inbox'
        )
        this.email = ''
      } catch (error) {
        console.log(error)
        this.displayFeedback(
          'Something went wrong, could not send password reset mail',
          'error'
        )
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/keyframes.css';

h1 {
  color: var(--main-coffee);
}
p {
  margin: 0px 5px 0px 0px;
}
.same-width {
  width: 7rem;
}

.feedback-enter-active {
  animation: fade 0.3s ease;
}
.feedback-leave-active {
  animation: fade 0.3s ease reverse;
}
</style>
