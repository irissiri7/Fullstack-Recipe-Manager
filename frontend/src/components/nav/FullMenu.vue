<template>
  <div class="flex center">
    <base-logo @click="$emit('backtohome')"></base-logo>
    <transition name="fade">
      <nav v-if="$store.getters.isAuth">
        <ul>
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

.ui.icon.button {
  background-color: transparent;
}
.sign.out.alternate.icon.large {
  background-color: transparent;
}

a:hover,
.ui.icon.button:hover {
  color: #30292f;
  border: 1px solid #30292f;
  background-color: #eeb63d;
  border-radius: 10px;
}

.ui.icon.button:hover .sign.out.alternate.icon.large {
  background-color: #eeb63d;
}

.fade-enter-active {
  animation: fade 0.3s ease;
}
.fade-leave-active {
  animation: fade 0.3s ease reverse;
}
</style>
