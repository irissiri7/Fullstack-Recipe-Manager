<template>
  <div class="flex center">
    <base-logo @click="$emit('backtohome')"></base-logo>
    <transition name="fade">
      <nav v-if="$store.getters.isAuth">
        <ul class="nav-list">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/my-recipes">My Recipes</router-link></li>
          <li><router-link to="/my-profile">My Profile</router-link></li>
        </ul>
      </nav>
    </transition>
  </div>
  <div v-if="$store.getters.isAuth" id="sign-out-icon">
    <button class="ui icon button" @click="$emit('signout')">
      <i class="sign out alternate icon large"></i>
    </button>
  </div>
</template>

<script>
import BaseLogo from '../ui/BaseLogo.vue'
export default {
  components: {
    BaseLogo
  },
  emits: ['backtohome', 'signout']
}
</script>

<style scoped>
@import '../../assets/keyframes.css';

nav {
  margin-left: 1em;
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
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

.ui.header {
  color: var(--main-coffee);
  cursor: pointer;
}

.content {
  font-family: Rochester, sans-serif;
  font-size: 50px;
}
.ui.icon.button {
  background-color: var(--main-orange);
}
.sign.out.alternate.icon.large {
  background-color: var(--main-orange);
}

.fade-enter-active {
  animation: fade 0.3s ease;
}
.fade-leave-active {
  animation: fade 0.3s ease reverse;
}
</style>
