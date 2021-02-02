<template>
  <div>
    <cursive-header centered>
      Great to see you {{ firstName }}!
    </cursive-header>
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
      <carousel></carousel>
    </base-card>
  </div>
</template>

<script>
import client from '../util/Client.js'
import dotenv from 'dotenv'

import CursiveHeader from '../components/CursiveHeader.vue'
import Carousel from '../components/Carousel.vue'

dotenv.config()

export default {
  components: { CursiveHeader, Carousel },
  data() {
    return {
      firstName: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const user = await client.getUserDetails()
        this.firstName = user.firstName
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
