<template>
  <div class="box" :class="style">
    <slot></slot>
    <ul>
      <li v-for="(item, index) in bulletPoints" :key="index">- {{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    bulletPoints: {
      type: Array,
      default: () => []
    },
    style: {
      type: String,
      default: 'informational'
    }
  }
}
</script>

<style>
.box {
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
}
.error {
  border: 1px solid var(--main-alert);
  color: #4d221f;
  background-color: #e2857e8f;
}
.informational {
  border: 1px solid var(--main-pine);
  color: #416658;
  background-color: #b5ebb59f;
}
</style>
