<template>
  <base-feedback-card v-if="feedback.message" :mode="feedback.mode">
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
        @keydown.space.prevent
        required
        v-model.trim="newPassword"
      />
    </div>
    <div class="field">
      <label>Confirm New Password</label>
      <input
        type="password"
        name="new-password-confirmed"
        placeholder="Confirmed Password"
        minlength="6"
        @keydown.space.prevent
        required
        v-model.trim="confirmedPassword"
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
import client from '../util/Client.js'
import feedback from '../mixins/feedback.js'
export default {
  mixins: [feedback],
  props: {
    currentProps: {
      type: Object,
      required: false
    }
  },
  /* eslint-disable vue/custom-event-name-casing */
  emits: ['userUpdated'],
  data() {
    return {
      newPassword: '',
      confirmedPassword: ''
    }
  },
  computed: {
    validForm() {
      return this.newPassword && this.newPassword === this.confirmedPassword
    }
  },
  methods: {
    async changePassword() {
      try {
        const data = await client.changePassword(this.newPassword)
        await this.$store.dispatch('setUser', {
          firebaseId: data.localId,
          token: data.idToken,
          refreshToken: data.refreshToken,
          email: data.email
        })
        this.displayFeedback('Password successfully changed!')
        this.emptyForm()
        this.$emit('userUpdated')
      } catch (error) {
        this.displayFeedback(
          'Something went wrong, could not change password',
          'error'
        )
      }
    },
    emptyForm() {
      this.newPassword = ''
      this.confirmedPassword = ''
    }
  }
}
</script>

<style scoped>
.ui.form {
  margin-top: 1.5rem;
}
</style>
