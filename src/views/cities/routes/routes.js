import Table from '../parts/Table.vue'

const routes = [
  {
    path: '/cities/:governorate_id?/:country_id?',
    name: 'cities',
    component: Table,
    props: (route) => ({
      country_id: route.params.country_id || null,
      governorate_id: route.params.governorate_id || null,
    }),
  },
]

export default routes
