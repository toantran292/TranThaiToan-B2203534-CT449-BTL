import { useAuthStore } from '@/stores'
import AuthorCreate from '@/views/Author/AuthorCreate.vue'
import AuthorEdit from '@/views/Author/AuthorEdit.vue'
import AuthorView from '@/views/Author/AuthorView.vue'
import BookView from '@/views/Book/BookView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PublisherCreate from '@/views/Publisher/PublisherCreate.vue'
import PublisherEdit from '@/views/Publisher/PublisherEdit.vue'
import PublisherView from '@/views/Publisher/PublisherView.vue'
import UserCreate from '@/views/User/UserCreate.vue'
import UserEdit from '@/views/User/UserEdit.vue'
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
          path: 'users/:id',
          name: 'user:edit',
          component: UserEdit
        },
        {
          path: 'books',
          name: 'book',
          component: BookView
        },
        {
          path: 'publishers',
          name: 'publisher',
          component: PublisherView
        },
        {
          path: 'publishers/create',
          name: 'publisher:create',
          component: PublisherCreate
        },
        {
          path: 'publishers/:id',
          name: 'publisher:edit',
          component: PublisherEdit
        },
        {
          path: 'authors',
          name: 'author',
          component: AuthorView
        },
        {
          path: 'authors/create',
          name: 'author:create',
          component: AuthorCreate
        },
        {
          path: 'authors/:id',
          name: 'author:edit',
          component: AuthorEdit
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
