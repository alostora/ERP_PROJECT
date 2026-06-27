import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/payment-income-items/:company_id',
    name: 'payment-income-items',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
