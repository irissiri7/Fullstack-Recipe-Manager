<template>
  <div class="card">
    <h1>Sign Up</h1>
    <form class="ui form">
      <div class="field">
        <label>Email</label>
        <div class="field">
          <input
            type="text"
            name="email"
            placeholder="name@email.com"
            required
          />
        </div>
        <label>Password</label>
        <div class="field">
          <input
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
export default {
  data() {
    return {
      acceptsTermsOfUse: false,
    };
  },
  methods: {
    signUp() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
