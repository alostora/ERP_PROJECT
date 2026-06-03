import Table from '../parts/Table.vue'
import Show from '../parts/Show.vue'

const routes = [
  {
    path: 'company/branches/:company_id',
    name: 'branches',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
  {
    path: 'company/branch/:company_id/:branch_id',
    name: 'branch-show',
    component: Show,
    props: (route) => ({
      company_id: route.params.company_id || null,
      branch_id: route.params.branch_id || null,
    }),
  },
]

export default routes
