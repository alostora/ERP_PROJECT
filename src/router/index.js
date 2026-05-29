import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/Main.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import usersRoutes from '@/views/users/routes/routes'
import countriesRoutes from '@/views/countries/routes/routes'
import governoratesRoutes from '@/views/governorates/routes/routes'
import citiesRoutes from '@/views/cities/routes/routes'
import companiesRoutes from '@/views/companies/routes/routes'
import categoriesRoutes from '@/views/categories/routes/routes'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/',
    component: MainLayout,
    meta: { auth: true },
    children: [
      { path: '', name: 'dashboard', component: Dashboard },
      ...usersRoutes,
      ...countriesRoutes,
      ...governoratesRoutes,
      ...citiesRoutes,
      ...companiesRoutes,
      ...categoriesRoutes,
    ],
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from) => {
  const token = localStorage.getItem('authToken')
  if (to.meta.auth && !token) return '/login'
  if (to.meta.guest && token) return '/'
  return true
})

export default router
