<template>
  <the-navigation :isLoggedIn="isLoggedIn"></the-navigation>
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
  color: var(--main-coffee);
}

main {
  min-height: 100%;
  margin: 0 auto;
  width: 40%;
}

.card {
  border-radius: 10px;
  box-shadow: 0px 0px 21px -1px rgba(0, 0, 0, 0.69);
  margin: 1rem auto 2rem;
  padding: 2rem;
  background-color: white;
}

.ui.button {
  background-color: #502419;
  color: white;
}

.img-cnt {
  width: 100%;
  height: 10rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.fade-box {
  max-height: 100px;
  position: relative;
  overflow: hidden;
}

.fade-box .read-more {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  height: 50%;
  background-image: linear-gradient(to bottom, transparent, white);
}

/* utility classes */
.flex {
  display: flex;
}

.center {
  justify-content: center;
  align-items: center;
}

/* Media queries */
@media screen and (max-width: 768px) {
  main {
    width: 90%;
  }
}
</style>
