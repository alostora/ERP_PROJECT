import branches from './branches'

export default {
  title: 'Purchase Invoices',
  id: '#',
  name: 'Name',
  total_additional_taxes: 'Total Additional Taxes',
  total_additional_costs: 'Total Additional Costs',
  total_additional_discounts: 'Total Additional Discounts',
  grand_total: 'Grand Total (Including Tax)',
  stage_updated_at: 'Stage Updated At',
  is_closed: 'Is Closed?',
  /////////////////////////////
  company: 'Company',
  /////////////////////////////
  categories: 'Categories',
  category: 'Category',
  select_category: 'Select Category',
  /////////////////////////////
  final_products: 'Products',
  final_product: 'Product',
  select_final_product: 'Select Product',
  /////////////////////////////
  branches: 'Branches',
  branch: 'Branch',
  select_branch: 'Select Branch',
  /////////////////////////////
  contact: 'Supplier',
  contacts: 'Suppliers',
  select_contact: 'Select Supplier',
  /////////////////////////////
  payment_type: 'Payment Type',
  payment_types: 'Payment Types',
  select_payment_type: 'Select Payment Type',
  /////////////////////////////
  warehouse: 'Warehouse / Store',
  warehouses: 'Warehouses / Stores',
  select_warehouse: 'Select Warehouse / Store',
  /////////////////////////////
  quantity: 'Quantity',
  unit_price: 'Unit Price',
  measurement_unit: 'Measurement Unit',
  total_price: 'Total Price',
  subtotal: 'Subtotal',
  /////////////////////////////
  stage: 'Stage',
  employee: 'Employee',
  invoice_payment_status: 'Payment Status',
  payments: 'Payments',
  paid_amount: 'Paid Amount',
  remaining_amount: 'Remaining Amount',
  paid_at: 'Payment Completed At',
  /////////////////////////////
  createdAt: 'Created At',
  validation: {
    companyIdRequired: 'Company is required',
    branchIdRequired: 'Branch is required',
    warehouseIdRequired: 'Warehouse / Store is required',
  },
}
