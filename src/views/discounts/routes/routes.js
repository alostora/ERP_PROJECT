import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/discounts/:company_id',
    name: 'discounts',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
