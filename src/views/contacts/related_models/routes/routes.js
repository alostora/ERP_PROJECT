import RelatedModels from '../RelatedModels.vue'
import contactAddresses from '@/views/contacts/related_models/addresses/routes/routes'
import contactPhoness from '@/views/contacts/related_models/phones/routes/routes'
import contactEmails from '@/views/contacts/related_models/emails/routes/routes'

const routes = [
  {
    path: 'company/contacts/related-models/:company_id/:contact_id',
    name: 'related-models',
    component: RelatedModels,
    props: (route) => ({
      company_id: route.params.company_id || null,
      contact_id: route.params.contact_id || null,
    }),
    children: [...contactAddresses, ...contactPhoness, ...contactEmails],
  },
]

export default routes
