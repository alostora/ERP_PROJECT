import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/employees/:company_id',
    name: 'employees',
    component: Table,
  },
]

export default routes
