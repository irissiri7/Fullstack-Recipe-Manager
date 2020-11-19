<template>
  <header>
    <h1>My recipies</h1>
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
h1 {
  padding-top: 8px;
  padding-left: 24px;
  border-bottom: 2px solid #30292f;
  font-family: Lobster;
  font-weight: 200;
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
  padding: 0;
  height: 100%;
  display: flex;
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
