import Table from '../parts/Table.vue'
import relatedMdelsRoutes from '../related_models/routes/routes'

const routes = [
  {
    path: 'company/contacts/:company_id',
    name: 'contacts',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
    }),
  },
  ...relatedMdelsRoutes,
]

export default routes
