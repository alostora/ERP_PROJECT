import RelatedModels from '../RelatedModels.vue'
import employeeStages from '../employees/routes/routes'

const routes = [
  {
    path: 'company/stages/related-models/:company_id/:stage_id',
    name: 'stage-related-models',
    component: RelatedModels,
    props: (route) => ({
      company_id: route.params.company_id || null,
      stage_id: route.params.stage_id || null,
    }),
    children: [...employeeStages],
  },
]

export default routes
