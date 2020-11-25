<template>
  <div class="card">
    <h1>Sign Up</h1>
    <form class="ui form">
      <div class="field">
        <label>Email</label>
        <div class="field">
          <input
            v-model="email"
            type="text"
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
            required
          />
        </div>
        <label>Confirm password</label>
        <div class="field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <div class="ui checkbox">
        <input type="checkbox" name="example" v-model="acceptsTermsOfUse" />
        <label>I agree to terms of use</label>
      </div>
      <div class="field">
        <button
          class="ui button"
          v-bind:class="{ disabled: !acceptsTermsOfUse }"
          @click.prevent="signUp"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import apiKey from "../assets/api-key.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      acceptsTermsOfUse: false,
    };
  },
  methods: {
    signUp() {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            returnSecureTokeN: true,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
