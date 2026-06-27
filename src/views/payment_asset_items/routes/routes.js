import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/payment-asset-items/:company_id',
    name: 'payment-asset-items',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
