import { useAuthStore } from '@/stores'
import BookView from '@/views/Book/BookView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import UserCreate from '@/views/User/UserCreate.vue'
import UserView from '@/views/User/UserView.vue'
import { notification } from 'ant-design-vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'users',
          name: 'user',
          component: UserView,
          children: []
        },
        {
          path: 'users/create',
          name: 'user:create',
          component: UserCreate
        },
        {
          path: 'books',
          name: 'book',
          component: BookView
        }
      ]
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
