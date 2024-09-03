import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

const app = createApp(App)

const defer = (import.meta.env?.VITE_INTRO === false) ? 0 : 7000

setTimeout(() => {
  app.mount('#app')
}, defer)
