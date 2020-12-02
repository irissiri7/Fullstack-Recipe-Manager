<template>
  <div class="card">
    <h1>Log In</h1>
    <form class="ui form">
      <div class="field">
        <label>Email</label>
        <div class="field">
          <input type="text" name="email" placeholder="Email" v-model="email" />
        </div>
        <label>Password</label>
        <div class="field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
      </div>
      <div class="field">
        <button class="ui button" @click.prevent="signIn">Log In</button>
      </div>
      <div class="field">
        <p>Not a user?</p>
        <button class="ui button" @click.prevent="signUp">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'lydia@example.com',
      password: '123123'
    }
  },
  methods: {
    signIn() {
      this.$store
        .dispatch('signIn', {
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
    },
    signUp() {
      this.$router.push('/sign-up')
    }
  }
}
</script>

<style scoped>
h1 {
  color: var(--main-coffee);
}
p {
  margin: 0px;
}

.ui.button {
  width: 7rem;
}
</style>
