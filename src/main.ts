import './assets/base.scss'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Primevue from 'primevue/config'

import { worker } from './mocks/worker'
if (import.meta.env.VITE_ENV_MODE === "local") {
    worker.start();
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Primevue)

app.mount('#app')
