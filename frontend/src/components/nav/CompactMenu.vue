<template>
  <div class="flex outer">
    <div id="menu-icon">
      <i
        v-if="$store.getters.isAuth"
        class="align justify icon large"
        @click="toggleMenu"
      ></i>
    </div>
    <div>
      <base-logo no-lemon @click="$emit('backtohome')"></base-logo>
    </div>
  </div>
  <transition name="fade">
    <nav v-if="showMenu">
      <ul>
        <li @click.prevent="showMenu = false">
          <router-link to="/home">Home</router-link>
        </li>
        <li @click.prevent="showMenu = false">
          <router-link to="/my-recipes">My Recipes</router-link>
        </li>
        <li @click.prevent="showMenu = false">
          <router-link to="/my-profile">My Profile</router-link>
        </li>
        <li>
          <a @click="signOut">Sign Out</a>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
import BaseLogo from '../ui/BaseLogo.vue'
export default {
  components: {
    BaseLogo
  },
  data() {
    return {
      showMenu: false
    }
  },
  emits: ['backtohome', 'signout'],
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    signOut() {
      this.showMenu = false
      this.$emit('signout')
    }
  }
}
</script>

<style scoped>
/* Miscellaneous styles */
nav {
  margin-top: 1em;
}
.outer {
  align-items: center;
  flex-wrap: wrap-reverse;
}
#menu-icon {
  margin-right: 1em;
}

/* Drop down menu styles */
li {
  margin-bottom: 10px;
}
a {
  text-decoration: none;
  background: transparent;
  color: var(--main-coffee);
  padding: 5px;
  border-bottom: none;
}

a:hover {
  background-color: #eeb63d;
  color: var(--main-coffee);
  border-bottom: none;
}

/* Animating drop down menu */
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
