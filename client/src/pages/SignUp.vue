<template>
  <div class="card">
    <h1>Sign Up</h1>
    <form class="ui form" @submit.prevent="signUp">
      <div class="field">
        <label>Email</label>
        <div class="field">
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="name@email.com"
            required
          />
        </div>
        <label>Password</label>
        <div class="field">
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
            minlength="6"
            required
          />
        </div>
        <label>Confirm password</label>
        <div class="field">
          <input
            v-model="confirmedPassword"
            type="password"
            name="confirmedPassword"
            placeholder="Confirm Password"
            minlength="6"
            required
          />
        </div>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="example" v-model="acceptsTermsOfUse" />
        <label>I agree to terms of use</label>
      </div>
      <div class="field">
        <button class="ui button" v-bind:class="{ disabled: !validForm }">
          Sign Up
        </button>
      </div>
      <div class="field">
        <p v-if="error">
          Something went wrong, could not sign up new user
        </p>
        <div v-if="successfullSignUp">
          <h4>
            Welcome new user!
          </h4>
          <p>Redirecting to log in page...</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      confirmedPassword: null,
      acceptsTermsOfUse: false,
      error: false,
      successfullSignUp: false
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
        .then(success => {
          console.log(success)
          this.$router.push('/home')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style></style>
