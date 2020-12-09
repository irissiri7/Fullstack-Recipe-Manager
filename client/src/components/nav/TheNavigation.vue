<template>
  <header>
    <div class="flex center">
      <h2 class="ui header" @click.prevent="backToHome">
        <i class="lemon outline icon"></i>
        <div class="content">
          Recipe Manager
        </div>
      </h2>
      <nav v-if="$store.getters.isAuth">
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/my-recipes">My Recipes</router-link></li>
          <li><router-link to="/my-profile">My Profile</router-link></li>
        </ul>
      </nav>
    </div>
    <div v-if="$store.getters.isAuth">
      <button class="ui icon button" @click="signOut">
        <i class="sign out alternate icon large"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    backToHome() {
      if (this.$store.getters.isAuth) this.$router.push('/home')
      else this.$router.push('/')
    },
    signOut() {
      this.$store.dispatch('signOut')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ui.header {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  margin: 0px;
  color: var(--main-coffee);
  cursor: pointer;
}
.content {
  font-family: Rochester, sans-serif;
  font-size: 50px;
}
header {
  width: 100%;
  background-color: var(--main-orange);
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: var(--main-coffee);
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
a.active {
  color: #30292f;
  border-color: #30292f;
  background-color: #eeb63d;
  border-radius: 10px;
}

.ui.icon.button {
  background-color: var(--main-orange);

  border-radius: 10px;
  margin-right: 10px;
}
.ui.icon.button:hover {
  background-color: #eeb63d;
  border: 1px solid #30292f;
}
.sign.out.alternate.icon {
  color: var(--main-coffee);
}
</style>
