<template>
  <div class="box" :class="mode">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
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
