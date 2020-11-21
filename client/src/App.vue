<template>
  <the-navigation v-if="isLoggedIn"></the-navigation>
  <main>
    <router-view @log-in="signIn"></router-view>
  </main>
</template>

<script>
import TheNavigation from "./components/nav/TheNavigation.vue";

export default {
  name: "App",
  components: {
    TheNavigation,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    signIn() {
      this.isLoggedIn = !this.isLoggedIn;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&family=Rochester&display=swap");

:root {
  --main-orange: #f1a80a;
  --main-coffee: #30292f;
}

* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  font-family: "Open Sans", sans-serif;
}

body,
html,
#app {
  height: 100vh;
  width: 100vw;
  background-image: url("./assets/spinach.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

h1 {
  color: white;
  text-align: center;
}

main {
  min-height: 100%;
  margin: 0 auto;
  width: 50%;
}

.card {
  border-radius: 10px;
  box-shadow: 0px 0px 21px -1px rgba(0, 0, 0, 0.69);
  margin: 2rem auto;
  width: 80%;
  padding: 2rem;
  background-color: white;
}
</style>
