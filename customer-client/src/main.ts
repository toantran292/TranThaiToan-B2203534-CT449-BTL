import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Antd from 'ant-design-vue'
import 'bootstrap/dist/css/bootstrap.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project

import FasIcon from '@/components/common/FasIcon.vue'
import 'ant-design-vue/dist/reset.css'
import './main.css'

const pinia = createPinia()
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('fas-icon', FasIcon)
app.use(router)
app.use(pinia)
app.use(Antd)

app.mount('#app')
