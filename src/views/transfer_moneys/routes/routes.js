import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/transfer-moneys/:company_id/:branch_id?',
    name: 'transfer-moneys',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
      branch_id: route.params.branch_id || null,
    }),
  },
]

export default routes
