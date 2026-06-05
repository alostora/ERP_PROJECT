import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'discount_final_products',
    name: 'discount-final-products',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
      discount_id: route.params.discount_id || null,
    }),
  },
]

export default routes
