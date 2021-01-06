<template>
  <router-link :to="to" :class="{ light: light }">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    light: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
a {
  font-weight: 700;
  color: var(--main-coffee);
  border-bottom: 1px solid var(--main-coffee);
}

a:hover {
  color: var(--main-pine);
  border-bottom: 1px solid var(--main-pine);
}
a:visited {
  color: none;
}

.light {
  color: white;
  border-bottom: 1px solid white;
}
</style>
