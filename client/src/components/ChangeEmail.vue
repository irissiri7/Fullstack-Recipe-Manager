<template>
  <form class="ui form" @submit="changeEmail"></form>
  <div class="field">
    <p>Current email: {{ currentEmail }}</p>
  </div>
  <div class="field">
    <label>New Email</label>
    <input
      type="email"
      name="new-email"
      placeholder="New Email"
      v-model="newEmail"
    />
  </div>
  <div class="field">
    <label>Confirm New Email</label>
    <input
      type="email"
      name="new-email-confirmed"
      placeholder="Confirmed Email"
      v-model="confirmedEmail"
    />
  </div>
  <div class="field">
    <base-button>Change Email</base-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentEmail: '',
      newEmail: '',
      confirmedEmail: ''
    }
  },
  methods: {
    changePassword() {
      console.log('Changing Email :D')
    }
  }
}
</script>

<style></style>
