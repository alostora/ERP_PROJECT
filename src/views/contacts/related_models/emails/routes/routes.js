import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'emails',
    name: 'contact-emails',
    component: Table,
    props: (route) => ({
      company_id: route.params.company_id || null,
      contact_id: route.params.contact_id || null,
    }),
  },
]

export default routes
