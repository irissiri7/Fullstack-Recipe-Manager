<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavigation from "./components/nav/TheNavigation.vue";

export default {
  name: "App",
  components: {
    TheNavigation,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  font-family: sans-serif;
}

body,
html,
#app {
  height: 100vh;
  width: 100vw;
}

main {
  box-shadow: 0px 0px 21px -1px rgba(0, 0, 0, 0.69);
  min-height: 100%;
  margin: 0 auto;
  width: 50%;
  -webkit-box-shadow: 0px 0px 21px -1px rgba(0, 0, 0, 0.69);
}
</style>
