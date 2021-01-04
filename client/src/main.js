import { createApp } from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'

import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseFeedbackCard from './components/ui/BaseFeedbackCard.vue'
import BaseModal from './components/ui/BaseModal.vue'

const app = createApp(App)

app.use(router)
app.use(store)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-feedback-card', BaseFeedbackCard)
app.component('base-modal', BaseModal)

app.mount('#app')
