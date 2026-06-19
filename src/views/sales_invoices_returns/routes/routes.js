import Table from '../parts/Table.vue'

const routes = [
  {
    path: 'company/sales-invoices-returns/:sales_invoice_id/:company_id?/:branch_id?',
    name: 'sales-invoices-returns',
    component: Table,
    props: (route) => ({
      sales_invoice_id: route.params.sales_invoice_id || null,
      company_id: route.params.company_id || null,
      branch_id: route.params.branch_id || null,
    }),
  },
]

export default routes
