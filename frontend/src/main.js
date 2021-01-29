import { createApp, defineAsyncComponent } from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'

//REGULAR COMPONENTS
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseImage from './components/ui/BaseImage.vue'
import BaseLink from './components/ui/BaseLink.vue'

//ASYNC COMPONENTS (only loaded when needed)
const BaseModal = defineAsyncComponent(() =>
  import('./components/ui/BaseModal.vue')
)
const BaseFeedbackCard = defineAsyncComponent(() =>
  import('./components/ui/BaseFeedbackCard.vue')
)

const app = createApp(App)

app.use(router)
app.use(store)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-feedback-card', BaseFeedbackCard)
app.component('base-modal', BaseModal)
app.component('base-image', BaseImage)
app.component('base-link', BaseLink)

app.mount('#app')
