<template>
  <form class="ui form" @submit="changePassword">
    <div class="field">
      <label>Old Password</label>
      <input type="password" name="old-password" placeholder="Old Password" />
    </div>
    <div class="field">
      <label>New Password</label>
      <input type="password" name="new-password" placeholder="New Password" />
    </div>
    <div class="field">
      <label>Confirm New Password</label>
      <input
        type="password"
        name="new-password-confirmed"
        placeholder="Confirmed Password"
      />
    </div>
    <div class="field">
      <base-button>Change Password</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmedPassword: ''
    }
  },
  methods: {
    changePassword() {
      console.log('Changing password :D')
    }
  }
}
</script>

<style></style>
