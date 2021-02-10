<template>
  <div class="overlay">
    <div class="modal">
      <base-card>
        <slot name="title"></slot>
        <slot name="content"></slot>
        <base-button @click="$emit('user-selection', true)"
          >Confirm</base-button
        >
        <base-button class="alert" @click="$emit('user-selection', false)"
          >Cancel</base-button
        >
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseCard from './BaseCard.vue'
export default {
  emits: ['user-selection'],
  components: { BaseCard }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 6;
}

.modal {
  position: relative;
  top: 20px;
  margin: 0 auto;
  width: 50%;
}

@media screen and (max-width: 768px) {
  .modal {
    width: 90%;
  }
}
</style>
