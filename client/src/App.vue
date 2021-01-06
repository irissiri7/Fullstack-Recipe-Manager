<template>
  <the-navigation></the-navigation>
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation
  },
  created() {
    this.$store.dispatch('autoSignIn')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Rochester&display=swap');

:root {
  --main-orange: #f1a80a;
  --main-coffee: #30292f;
  --main-pine: #63a088;
  --main-alert: #e3655b;
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

/* Hide scrollbar for Chrome, Safari and Opera */
html::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Firefox, Edge */
html {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

main {
  min-height: 100%;
  margin: 20px auto;
  width: 40%;
}
/* List styles */
ul {
  list-style: none;
}

/* Link styles */
a {
  color: var(--main-coffee);
  border-bottom: 1px solid var(--main-coffee);
}
a:hover {
  color: var(--main-pine);
  border-bottom: 1px solid var(--main-pine);
}
a:visited {
  color: none;
}

/* utility classes */
.flex {
  display: flex;
  flex-wrap: wrap;
}

.corner {
  justify-content: space-between;
}

.center {
  justify-content: center;
  align-items: center;
}

.route-enter-active {
  animation: fade 0.4s ease;
}
.route-leave-active {
  animation: fade 0.4s ease reverse;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Media queries */
@media screen and (max-width: 768px) {
  main {
    width: 90%;
  }
}
</style>
