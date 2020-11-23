<template>
  <header>
    <h2 class="ui header" @click.prevent="backToHome">
      <i class="lemon outline icon"></i>
      <div class="content">
        Recipe Manager
      </div>
    </h2>
    <nav v-if="isLoggedIn">
      <ul>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/my-recipes">My Recipes</router-link></li>
        <li><router-link to="/my-profile">My Profile</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    backToHome() {
      if (this.isLoggedIn) this.$router.push("/home");
      else this.$router.push("/");
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
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
</style>
