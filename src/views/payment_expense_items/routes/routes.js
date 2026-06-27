import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/payment-expense-items/:company_id',
    name: 'payment-expense-items',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
