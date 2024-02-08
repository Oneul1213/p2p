import './assets/base.scss'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Primevue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import { worker } from './mocks/worker'

if (import.meta.env.VITE_ENV_MODE === "local") {
    // ========== msw 관련 처리 ==========
    worker.start({
        onUnhandledRequest(request, print) {
            // /v1을 포함하지 않는 url은 경고를 표시하지 않음
            if (!request.url.includes('/v1')) {
                return;
            }

            print.warning();
        }
    });
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Primevue)
app.use(ToastService)

app.mount('#app')
