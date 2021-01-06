<template>
  <button class="ui button" :class="[mode, { light: light }]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    light: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
/* Default button styles */
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

/* Alert button styles */
.ui.button.alert {
  background-color: var(--main-alert);
  border: 1px solid var(--main-alert);
}
.ui.button.alert:hover {
  background-color: white;
  color: var(--main-alert);
}

/* Link looking button styles */
.ui.button.link {
  background-color: transparent;
  border: none;
  color: var(--main-coffee);
  border-bottom: 1px solid var(--main-coffee);
  border-radius: 0px;
  padding: 0px 0px 3px 0px;
}
.ui.button.link:hover {
  color: var(--main-pine);
  border-bottom: 1px solid var(--main-pine);
}

/* Light link looking button styles */
.ui.button.link.light {
  color: white;
  border-bottom: 1px solid white;
}
.ui.button.link.light:hover {
  color: var(--main-pine);
  border-bottom: 1px solid var(--main-pine);
}
</style>
