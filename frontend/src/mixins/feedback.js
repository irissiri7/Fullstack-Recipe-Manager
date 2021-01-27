export default {
  data() {
    return {
      feedback: {
        message: undefined,
        style: undefined
      }
    }
  },
  methods: {
    displayFeedback(message, style) {
      window.scrollTo(0, 0)
      this.feedback.message = message
      this.feedback.style = style
      setTimeout(() => {
        this.feedback.message = undefined
        this.feedback.style = undefined
      }, 3000)
    }
  }
}
