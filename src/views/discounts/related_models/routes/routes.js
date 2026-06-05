import RelatedModels from '../RelatedModels.vue'
import discountBraches from '../branches/routes/routes'
import discountFinalProducts from '../final_products/routes/routes'

const routes = [
  {
    path: 'company/discount/related-models/:company_id/:discount_id',
    name: 'discount-related-models',
    component: RelatedModels,
    props: (route) => ({
      company_id: route.params.company_id || null,
      discount_id: route.params.discount_id || null,
    }),
    children: [...discountBraches, ...discountFinalProducts],
  },
]

export default routes
