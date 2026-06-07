import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/purchases-invoices/:company_id/:branch_id?',
    name: 'purchases-invoices',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
      branch_id: route.params.branch_id || null,
    }),
  },
]

export default routes
