export default {
  data() {
    return {
      feedback: {
        message: undefined,
        mode: undefined
      }
    }
  },
  methods: {
    displayFeedback(message, mode) {
      window.scrollTo(0, 0)
      this.feedback.message = message
      this.feedback.mode = mode
      setTimeout(() => {
        this.feedback.message = undefined
        this.feedback.mode = undefined
      }, 3000)
    }
  }
}
