import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/account-guides/:company_id',
    name: 'account-guides',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
]

export default routes
