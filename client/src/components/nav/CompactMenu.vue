<template>
  <div class="flex outer">
    <div id="icon">
      <i
        v-if="$store.getters.isAuth"
        class="align justify icon large"
        @click="toggleMenu"
      ></i>
    </div>
    <div>
      <base-logo no-lemon @click="$emit('back-to-home')"></base-logo>
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
  emits: ['backToHome', 'signOut'],
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    signOut() {
      this.showMenu = false
      this.$emit('sign-out')
    }
  }
}
</script>

<style scoped>
nav {
  margin-top: 1em;
}
.outer {
  align-items: center;
  flex-wrap: wrap-reverse;
}
#icon {
  margin-right: 1em;
}
.ui.header {
  color: var(--main-coffee);
  cursor: pointer;
}

.content {
  font-family: Rochester, sans-serif;
  font-size: 50px;
}

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

a:hover,
a:active,
a.active {
  background-color: #e9a40f;
  color: var(--main-coffee);
  border-bottom: none;
}

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

@media screen and (max-width: 400px) {
  .content {
    font-size: 35px;
  }
}
</style>
