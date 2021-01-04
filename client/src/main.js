import { createApp } from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'

import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseFeedbackCard from './components/ui/BaseFeedbackCard.vue'

const app = createApp(App)

app.use(router)
app.use(store)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-Feedback-card', BaseFeedbackCard)

app.mount('#app')
