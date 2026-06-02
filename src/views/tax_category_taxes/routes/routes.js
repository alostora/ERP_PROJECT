import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/tax-category-taxes/:company_id/:tax_category_id',
    name: 'tax-category-taxes',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id,
      tax_category_id: route.params.tax_category_id,
    }),
  },
]

export default routes
