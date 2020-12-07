<template>
  <button class="ui button regular" :class="{ alert: alert }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    alert: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.regular {
  background-color: var(--main-pine);
  border: 1px solid var(--main-pine);
  color: white;
}
.regular:hover {
  background-color: white;
  color: var(--main-pine);
}

.alert {
  background-color: var(--main-alert);
  border: 1px solid var(--main-alert);
}
.alert:hover {
  background-color: white;
  color: var(--main-alert);
}
</style>
