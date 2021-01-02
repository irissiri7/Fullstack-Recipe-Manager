<template>
  <i class="align justify icon large" @click="toggleMenu"></i>
  <ul class="nav-list" v-if="showMenu">
    <li><router-link to="/home">Home</router-link></li>
    <li><router-link to="/my-recipes">My Recipes</router-link></li>
    <li><router-link to="/my-profile">My Profile</router-link></li>
    <li id="sign-out-li"><a @click="signOut">Sign Out</a></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    signOut() {
      this.$store.dispatch('signOut')
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
