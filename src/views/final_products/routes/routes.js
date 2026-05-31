import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/final-products/:company_id',
    name: 'final-products',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
