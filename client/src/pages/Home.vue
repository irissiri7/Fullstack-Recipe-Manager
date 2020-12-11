<template>
  <h1>Welcome {{ username }}!</h1>
  <base-card>
    <p>Recipe Manager is your own personal recipe book, put online.</p>
    <p>
      We make it super easy for you to add, edit and delete your favourit
      recipes, all in one place.
    </p>
    <p>
      No more sticky and greasy note books in the kitchen.
      <strong
        >Recipe Manager keeps it clean, managable and
        <em>always</em> available.</strong
      >
    </p>
  </base-card>
</template>

<script>
import BaseCard from '../components/ui/BaseCard.vue'
export default {
  components: { BaseCard }
}
</script>

<style scoped>
h1 {
  font-size: 100px;
  font-family: Rochester, sans-serif;
  color: white;
  text-align: center;
}
p {
  font-size: 20px;
}
</style>
