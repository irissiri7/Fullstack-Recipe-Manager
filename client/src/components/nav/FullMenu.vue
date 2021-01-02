<template>
  <ul class="nav-list">
    <li><router-link to="/home">Home</router-link></li>
    <li><router-link to="/my-recipes">My Recipes</router-link></li>
    <li><router-link to="/my-profile">My Profile</router-link></li>
  </ul>
</template>

<script>
export default {}
</script>

<style scoped>
ul {
  display: flex;
}
</style>
