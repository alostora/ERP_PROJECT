import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/purchases-invoices-returns/:purchases_invoice_id/:company_id?/:branch_id?',
    name: 'purchases-invoices-returns',
    component: Table,
    props: (route) => ({
      purchases_invoice_id: route.params.purchases_invoice_id || null,
      company_id: route.params.company_id || null,
      branch_id: route.params.branch_id || null,
    }),
  },
]

export default routes
