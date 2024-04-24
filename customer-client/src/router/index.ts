import BookDetail from '@/views/BookDetail.vue'
import BorrowList from '@/views/BorrowList.vue'
import ListBookView from '@/views/ListBookView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegisterView from '@/views/RegisterView.vue'
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
        },
        {
          path: ':id',
          name: 'books:detail',
          component: BookDetail
        },
        {
          path: 'borrows',
          name: 'borrow:list',
          component: BorrowList
        },
        {
          path: '/profile',
          name: 'profile',
          component: ProfileView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

// router.beforeEach(async (to) => {
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const auth = useAuthStore()
//   if (authRequired && !auth.user) {
//     notification.error({
//       message: 'Truy cập thất bại',
//       description: 'Vui lòng đăng nhập lại.',
//       duration: 2.5
//     })
//     auth.returnUrl = to.fullPath
//     return '/login'
//   }

//   if (to.path === '/login' && auth.user) {
//     return '/'
//   }
// })

export default router
