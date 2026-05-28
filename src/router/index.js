import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/Main.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { auth: true },
    children: [
      { path: '', name: 'dashboard', component: Dashboard },
      {
        path: 'users', name: 'users',
        component: () => import('@/views/users/parts/Table.vue')
      },
      {
        path: 'countries', name: 'countries',
        component: () => import('@/views/countries/parts/Table.vue')
      },
      {
        path: 'governorates', name: 'governorates',
        component: () => import('@/views/governorates/parts/Table.vue')
      },
      {
        path: 'cities', name: 'cities',
        component: () => import('@/views/cities/parts/Table.vue')
      },
      {
        path: 'companies', name: 'companies',
        component: () => import('@/views/companies/parts/Table.vue')
      }
    ]
  }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from) => {
  const token = localStorage.getItem('authToken')
  if (to.meta.auth && !token) return '/login'
  if (to.meta.guest && token) return '/'
  return true
})

export default router