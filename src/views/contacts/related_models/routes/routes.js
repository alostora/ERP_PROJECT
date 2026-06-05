import RelatedModels from '../RelatedModels.vue'
import contactAddresses from '../addresses/routes/routes'
import contactPhoness from '../phones/routes/routes'
import contactEmails from '../emails/routes/routes'

const routes = [
  {
    path: 'company/contacts/related-models/:company_id/:contact_id',
    name: 'contact-related-models',
    component: RelatedModels,
    props: (route) => ({
      company_id: route.params.company_id || null,
      contact_id: route.params.contact_id || null,
    }),
    children: [...contactAddresses, ...contactPhoness, ...contactEmails],
  },
]

export default routes
