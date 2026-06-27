import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/payment-liability-items/:company_id',
    name: 'payment-liability-items',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
