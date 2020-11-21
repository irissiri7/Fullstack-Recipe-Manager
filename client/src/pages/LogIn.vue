<template>
  <div class="card">
    <h1>Log In</h1>
    <form class="ui form">
      <div class="field">
        <label>Username</label>
        <div class="field">
          <input type="text" name="first-name" placeholder="First Name" />
        </div>
        <label>Password</label>
        <div class="field">
          <input type="text" name="last-name" placeholder="Last Name" />
        </div>
      </div>
      <button class="ui button" @click.prevent="logIn">Log In</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    logIn() {
      this.$emit("log-in");
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
h1 {
  color: var(--main-coffee);
}
</style>
