<template>
  <the-navigation class="stick"></the-navigation>
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <!-- <button @click="corruptToken">Corrupt token</button>
    <button @click="corruptRefreshToken">Corrupt refresh token</button> -->
  </main>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation
  },
  provide: {
    recipeDetailOptions: {
      categories: [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Starter',
        'Dessert',
        'Other'
      ],
      qualities: ['Gluten free', 'Lactose free', 'Vegetarian', 'Vegan'],
      timeToCook: ['About 15 min', 'About 30 min', '60 min or more']
    }
  },
  created() {
    this.$store.dispatch('autoSignIn')
  }
  // methods: {
  //   corruptToken() {
  //     console.log('corrupt token')
  //     this.$store.state.token = '123'
  //   },
  //   corruptRefreshToken() {
  //     console.log('corrupt refresh token')
  //     this.$store.state.refreshToken = '123'
  //   }
  // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Rochester&display=swap');
@import './assets/keyframes.css';

:root {
  --main-orange: #f1a80ae0;
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
  margin: 100px auto 20px;
  width: 40%;
}
/* List styles */
ul {
  list-style: none;
}
a {
  font-weight: 700;
}
/* Stick TheNavigation to top of screen */
.stick {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
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

/* Route animations */

.route-enter-active {
  animation: fade-slide-top 0.5s ease;
}
.route-leave-active {
  animation: fade-slide-top 0.5s ease reverse;
}

/* Media queries */
@media screen and (max-width: 900px) {
  main {
    width: 80%;
  }
}
</style>
