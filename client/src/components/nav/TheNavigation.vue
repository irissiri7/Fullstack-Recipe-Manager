<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/my-recipes">Home</router-link></li>
        <li><router-link to="/my-recipes">News</router-link></li>
        <li><router-link to="/my-recipes">Contact</router-link></li>
        <li><router-link to="/my-recipes">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  width: 100%;
  height: 5rem;
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
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
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
