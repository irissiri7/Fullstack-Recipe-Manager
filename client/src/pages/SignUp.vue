<template>
  <base-card>
    <h1>Sign Up</h1>
    <base-dialog-card v-if="feedback.message" :style="feedback.style">
      {{ feedback.message }}
    </base-dialog-card>
    <form class="ui form" @submit.prevent="signUp">
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
      <div class="field">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          minlength="6"
          required
        />
      </div>
      <div class="field">
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
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" name="example" v-model="acceptsTermsOfUse" />
          <label>I agree to terms of use</label>
        </div>
      </div>
      <div class="field">
        <base-button v-bind:class="{ disabled: !validForm }">
          Sign Up
        </base-button>
      </div>
    </form>
    <router-link to="/">Back to log in</router-link>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
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
      return (
        this.email &&
        this.password &&
        this.confirmedPassword &&
        this.acceptsTermsOfUse &&
        this.password === this.confirmedPassword
      )
    }
  },
  methods: {
    signUp() {
      this.$store
        .dispatch('signUp', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.feedback.style = 'informational'
          this.feedback.message = 'Sign up successful! Redirecting...'
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch(_error => {
          this.feedback.style = 'error'
          this.feedback.message =
            'Something went wrong :( ... Could not sign up new user'
        })
    }
  }
}
</script>

<style></style>
