import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

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
