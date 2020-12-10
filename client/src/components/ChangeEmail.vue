<template>
  <base-dialog-card v-if="feedback.message" :style="feedback.style">
    {{ feedback.message }}
  </base-dialog-card>
  <form class="ui form" @submit.prevent="changeEmail">
    <div class="field">
      <p><strong>Current email:</strong> {{ $store.getters.email }}</p>
    </div>
    <div class="field">
      <label>New Email</label>
      <input
        type="email"
        name="new-email"
        placeholder="New Email"
        v-model="newEmail"
        required
      />
    </div>
    <div class="field">
      <label>Confirm New Email</label>
      <input
        type="email"
        name="new-email-confirmed"
        placeholder="Confirmed Email"
        v-model="confirmedEmail"
        required
      />
    </div>
    <div class="field">
      <base-button :class="{ disabled: !validForm }">Change Email</base-button>
    </div>
  </form>
</template>

<script>
import BaseDialogCard from './ui/BaseDialogCard.vue'
export default {
  components: { BaseDialogCard },
  data() {
    return {
      newEmail: '',
      confirmedEmail: '',
      feedback: {
        message: null,
        style: null
      }
    }
  },
  computed: {
    validForm() {
      return (
        this.newEmail &&
        this.newEmail === this.confirmedEmail &&
        this.newEmail != this.$store.getters.email
      )
    }
  },
  methods: {
    changeEmail() {
      this.$store
        .dispatch('changeEmail', {
          email: this.newEmail
        })
        .then(() => {
          this.feedback.style = 'informational'
          this.feedback.message = 'Email successfully changed!'
          this.newEmail = ''
          this.confirmedEmail = ''
        })
        .catch(_error => {
          this.feedback.style = 'error'
          this.feedback.message = 'Something went wrong, could not change email'
        })
    }
  }
}
</script>

<style></style>
