import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/stages/:company_id',
    name: 'stages',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
