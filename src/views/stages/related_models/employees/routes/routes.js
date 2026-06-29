import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/stage-employees/',
    name: 'stage-employees',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
      stage_id: route.params.stage_id || null,
    }),
  },
]

export default routes
