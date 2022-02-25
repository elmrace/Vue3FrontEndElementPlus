import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import axios from 'axios'

import 'element-plus/dist/index.css'

const apiService = axios.create()
apiService.defaults.baseURL = 'http://localhost:5050/api/v1'

const app = createApp(App)
app.provide('apiService', apiService)

app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
