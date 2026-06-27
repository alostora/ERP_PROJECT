import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/payment-equity-items/:company_id',
    name: 'payment-equity-items',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
