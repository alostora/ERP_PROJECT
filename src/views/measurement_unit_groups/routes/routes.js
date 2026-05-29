import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/measurement-unit-groups/:company_id',
    name: 'measurement-unit-groups',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
