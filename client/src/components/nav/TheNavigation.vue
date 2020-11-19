<template>
  <header>
    <h2 class="ui header">
      <i class="lemon outline icon"></i>
      <div class="content">
        Recipe Manager
      </div>
    </h2>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/my-recipes">My Recipes</router-link></li>
        <li><router-link to="/my-profile">My Profile</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.ui.header {
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin: 0px;
}
header {
  width: 100%;
  background-color: #f1a80a;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding-bottom: 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: #30292f;
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
</style>
