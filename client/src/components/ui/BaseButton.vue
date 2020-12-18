<template>
  <button v-if="!link" class="ui button" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    },
    mode: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
a {
  font-weight: 700;
}
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

.ui.button.alert {
  background-color: var(--main-alert);
  border: 1px solid var(--main-alert);
}
.ui.button.alert:hover {
  background-color: white;
  color: var(--main-alert);
}
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
</style>
