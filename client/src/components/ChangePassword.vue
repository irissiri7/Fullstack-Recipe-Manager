<template>
  <base-feedback-card v-if="feedback.message" :style="feedback.style">
    {{ feedback.message }}
  </base-feedback-card>
  <form class="ui form" @submit.prevent="changePassword">
    <div class="field">
      <label>New Password</label>
      <input
        type="password"
        name="new-password"
        placeholder="New Password"
        minlength="6"
        required
        v-model="newPassword"
      />
    </div>
    <div class="field">
      <label>Confirm New Password</label>
      <input
        type="password"
        name="new-password-confirmed"
        placeholder="Confirmed Password"
        minlength="6"
        required
        v-model="confirmedPassword"
      />
    </div>
    <div class="field">
      <base-button :class="{ disabled: !validForm }"
        >Change Password</base-button
      >
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      confirmedPassword: '',
      feedback: {
        message: null,
        style: null
      }
    }
  },
  computed: {
    validForm() {
      return this.newPassword && this.newPassword === this.confirmedPassword
    }
  },
  methods: {
    changePassword() {
      this.$store
        .dispatch('changePassword', {
          password: this.newPassword
        })
        .then(() => {
          this.feedback.style = 'informational'
          this.feedback.message = 'Password successfully changed!'
          this.newPassword = ''
          this.confirmedPassword = ''
        })
        .catch(_error => {
          this.feedback.style = 'error'
          this.feedback.message =
            'Something went wrong, could not change password'
        })
    }
  }
}
</script>

<style scoped>
.ui.form {
  margin-top: 1.5rem;
}
</style>
