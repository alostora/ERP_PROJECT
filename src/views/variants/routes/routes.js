import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/variants/:company_id',
    name: 'variants',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
