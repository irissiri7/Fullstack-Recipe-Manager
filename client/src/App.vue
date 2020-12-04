<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Rochester&display=swap');

:root {
  --main-orange: #f1a80a;
  --main-coffee: #30292f;
  --main-pine: #63a088;
}

* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  font-family: 'Open Sans', sans-serif;
}

body,
html,
#app {
  height: 100vh;
  width: 100vw;
  background-image: url('./assets/spinach.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

main {
  min-height: 100%;
  margin: 0 auto;
  width: 40%;
}
/* list styles */
ul {
  list-style: none;
}
/* image styles */
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
/* link-styles */
a {
  color: var(--main-coffee);
}
a:hover {
  color: var(--main-pine);
  font-weight: 600;
}
a:visited {
  color: none;
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
