import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/final-product-variant-values/:company_id/:final_product_id',
    name: 'final-product-variant-values',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
      final_product_id: route.params.final_product_id || null,
    }),
  },
]

export default routes
