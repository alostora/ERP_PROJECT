import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/taxes/:company_id',
    name: 'taxes',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
