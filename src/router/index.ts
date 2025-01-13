import { createRouter, createWebHistory } from 'vue-router'
import LoginIndexView from '@/views/login/IndexView.vue'
import DashboardIndexView from '@/views/dashboard/IndexView.vue'
import RegisterStudentView from '@/views/register/StudentView.vue'
import RegisterDplView from '@/views/register/DplView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login.index',
      component: LoginIndexView,
    },
    {
      path: '/dashboard',
      name: 'dashboard.index',
      component: DashboardIndexView,
    },
    {
      path: '/register',
      children: [
        {
          path: 'student',
          name: 'register.student',
          component: RegisterStudentView,
        },
        {
          path: 'dpl',
          name: 'register.dpl',
          component: RegisterDplView,
        },
      ],
    },
  ],
})

export default router
