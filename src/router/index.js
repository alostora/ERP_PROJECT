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
import measurementUnitGroups from '@/views/measurement_unit_groups/routes/routes'
import measurementUnits from '@/views/measurement_units/routes/routes'
import variants from '@/views/variants/routes/routes'
import variantValues from '@/views/variant_values/routes/routes'
import products from '@/views/products/routes/routes'
import finalProducts from '@/views/final_products/routes/routes'
import finalProductVariantValues from '@/views/final_product_variant_values/routes/routes'
import stages from '@/views/stages/routes/routes'
import taxes from '@/views/taxes/routes/routes'
import taxCategories from '@/views/tax_categories/routes/routes'
import taxCategoryTaxes from '@/views/tax_category_taxes/routes/routes'
import employees from '@/views/employees/routes/routes'
import contacts from '@/views/contacts/routes/routes'
import branches from '@/views/branches/routes/routes'
import warehouses from '@/views/warehouses/routes/routes'
import discounts from '@/views/discounts/routes/routes'
import accountGuides from '@/views/account_guides/routes/routes'
import cashBoxes from '@/views/cash_boxes/routes/routes'
import bankAccounts from '@/views/bank_accounts/routes/routes'
import wallets from '@/views/wallets/routes/routes'
import transferMoneys from '@/views/transfer_moneys/routes/routes'

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
      ...measurementUnitGroups,
      ...measurementUnits,
      ...variants,
      ...variantValues,
      ...products,
      ...finalProducts,
      ...finalProductVariantValues,
      ...stages,
      ...taxes,
      ...taxCategories,
      ...taxCategoryTaxes,
      ...employees,
      ...contacts,
      ...branches,
      ...warehouses,
      ...discounts,
      ...accountGuides,
      ...cashBoxes,
      ...bankAccounts,
      ...wallets,
      ...transferMoneys,
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
