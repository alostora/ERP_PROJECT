import './assets/css/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import i18n from './i18n'

import App from './App.vue'
import router from './router'

// PrimeVue components
import Dialog from 'primevue/dialog'
import Panel from 'primevue/panel'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import FloatLabel from 'primevue/floatlabel'
import Textarea from 'primevue/textarea'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)

app.component('Dialog', Dialog)
app.component('Panel', Panel)
app.component('Select', Select)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('FloatLabel', FloatLabel)
app.component('Textarea', Textarea)

app.mount('#app')
