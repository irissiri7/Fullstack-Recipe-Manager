<template>
  <button class="ui button">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
/* Regular */
.ui.button {
  background-color: var(--main-pine);
  border: 1px solid var(--main-pine);
  color: white;
  font-family: 'Open Sans', sans-serif;
}
.ui.button:hover {
  background-color: white;
  color: var(--main-pine);
}
/* Alert */
.ui.button.alert {
  background-color: var(--main-alert);
  border: 1px solid var(--main-alert);
}
.ui.button.alert:hover {
  background-color: white;
  color: var(--main-alert);
}
/* Link-dark-look */
.ui.button.link {
  background-color: transparent;
  border: none;
  color: var(--main-coffee);
  border-bottom: 1px solid var(--main-coffee);
  border-radius: 0px;
  padding: 0px 0px 3px 0px;
}
.ui.button.link:hover {
  color: var(--main-orange);
  border-bottom: 1px solid var(--main-orange);
}
/* Link-light-look*/
.ui.button.link.light {
  color: white;
  border-bottom: 1px solid white;
}
.ui.button.link.light:hover {
  color: var(--main-orange);
  border-bottom: 1px solid var(--main-orange);
}
</style>
