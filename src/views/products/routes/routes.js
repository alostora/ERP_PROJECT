import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/products/:company_id',
    name: 'products',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
