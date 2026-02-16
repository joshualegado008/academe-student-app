/**
 * main.js — Application Entry Point
 * src/main.js
 *
 * Creates the Vue app, registers plugins, and mounts to #app.
 */

import { createApp } from 'vue'
import App    from './App.vue'
import router from './router/index.js'

// Global base styles
import './assets/styles/global.css'

const app = createApp(App)

app.use(router)

app.mount('#app')