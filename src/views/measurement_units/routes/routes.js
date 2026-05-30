import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/measurement-units/:company_id/:measurement_unit_group_id?',
    name: 'measurement-units',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
