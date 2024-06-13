import { registerPlugins } from '@/plugins'
import { registerTemplates } from '@/templates'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const app = createApp(App).use(router)
registerPlugins(app)
registerTemplates(app)
app.mount('#app')
