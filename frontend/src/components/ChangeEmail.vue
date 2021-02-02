<template>
  <base-feedback-card v-if="feedback.message" :mode="feedback.mode">
    {{ feedback.message }}
  </base-feedback-card>
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
        @keydown.space.prevent
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
        @keydown.space.prevent
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
import client from '../util/Client'
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
      newEmail: '',
      confirmedEmail: ''
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
    async changeEmail() {
      try {
        const data = await client.changeEmail(this.newEmail)
        await this.$store.dispatch('setUser', {
          firebaseId: data.localId,
          token: data.idToken,
          refreshToken: data.refreshToken,
          email: data.email
        })
        this.displayFeedback('Email successfully changed!')
        this.emptyForm()
        this.$emit('userUpdated')
      } catch (error) {
        this.displayFeedback(
          'Something went wrong, could not change email',
          'error'
        )
      }
    },
    emptyForm() {
      this.newEmail = ''
      this.confirmedEmail = ''
    }
  }
}
</script>

<style scoped>
.ui.form {
  margin-top: 1.5rem;
}
</style>
