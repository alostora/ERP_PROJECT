import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/variant-values/:company_id/:variant_id',
    name: 'variant-values',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
      variant_id: route.params.variant_id || null,
    }),
  },
]

export default routes
