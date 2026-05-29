import Table from '../parts/Table.vue'

const routes = [
     {
          path: 'company/categories/:company_id',
          name: 'categories',
          component: Table,
          props: (route) => ({
               company_id: route.params.company_id || null
          }),
     }
]

export default routes