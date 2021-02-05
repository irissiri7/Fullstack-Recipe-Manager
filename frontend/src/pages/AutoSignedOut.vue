<template>
  <base-card>
    <p>
      You have been signed out. Please sign in again.
    </p>
    <router-link to="/">Sign in</router-link>
  </base-card>
</template>

<script>
export default {}
</script>

<style scoped>
a {
  font-weight: 700;
  color: var(--main-coffee);
  border-bottom: 1px solid var(--main-coffee);
}

a:hover {
  color: var(--main-orange);
  border-bottom: 1px solid var(--main-orange);
}
a:visited {
  color: none;
}
</style>
