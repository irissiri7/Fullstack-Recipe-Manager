<template>
  <h1>Welcome {{ firstName }}!</h1>
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
import axios from 'axios'

import BaseCard from '../components/ui/BaseCard.vue'

export default {
  components: { BaseCard },
  data() {
    return {
      firstName: null
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_MY_URL}users/user/get-user-details/?firebaseId=${this.$store.getters.firebaseId}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.firstName = response.data.firstName
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.fetchData()
  }
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
