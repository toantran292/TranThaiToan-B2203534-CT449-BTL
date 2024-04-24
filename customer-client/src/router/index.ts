import { useAuthStore } from '@/stores'
import ListBookView from '@/views/ListBookView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { notification } from 'ant-design-vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'books',
          component: ListBookView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.user) {
    notification.error({
      message: 'Truy cập thất bại',
      description: 'Vui lòng đăng nhập lại.',
      duration: 2.5
    })
    auth.returnUrl = to.fullPath
    return '/login'
  }

  if (to.path === '/login' && auth.user) {
    return '/'
  }
})

export default router
