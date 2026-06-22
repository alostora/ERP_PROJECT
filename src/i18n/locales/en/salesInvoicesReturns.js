export default {
  title: 'Sales Invoice Returns',
  base_info: 'Base Information',
  id: '#',
  name: 'Name',
  reference_code: 'Reference Code',
  total_additional_taxes: 'Total Additional Taxes',
  grand_total: 'Grand Total (Including Tax)',
  stage_updated_at: 'Stage Updated At',
  is_closed: 'Is Closed?',
  is_active: 'Is Active?',
  date_from: 'Date from',
  date_to: 'Date to',
  net_amount: 'Net Amount',
  net_amount_after_costs_and_discounts: 'Net Amount After Costs',
  sales_invoice: 'Sales Invoice',
  sold_quantity: 'Sold Quantity',
  sold_measurement_unit: 'Soled Measurement Unit',
  remaining_returnable_quantity: 'Remaining Returnable Quantity',

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
  total_price_plus_operations: 'Total Price Plus Operations',
  subtotal: 'Subtotal',
  /////////////////////////////

  stage: 'Stage',
  stage_comment: 'Stage Comment',
  employee: 'Employee',
  invoice_payment_status: 'Payment Status',
  payments: 'Payments',
  paid_amount: 'Paid Amount',
  remaining_amount: 'Remaining Amount',
  paid_at: 'Payment Completed At',
  /////////////////////////////

  additional_costs: 'Additional Costs',
  total_additional_costs: 'Total Additional Costs',
  additional_discounts: 'Additional Discounts',
  total_additional_discounts: 'Total Additional Discounts',
  value: 'Value',

  /////////////////////////////
  operations: 'Product Operations',
  price: 'Price',
  details: 'Operation Details',
  files: 'Operation Files',
  total_operations_cost: 'Total Operations Cost',
  /////////////////////////////

  total_summary: 'Total Summary',
  /////////////////////////////

  createdAt: 'Created At',
  /////////////////////////////

  // English
  validation: {
    companyIdRequired: 'Company is required',
    branchIdRequired: 'Branch is required',
    warehouseIdRequired: 'Warehouse is required',
    finalProductsRequired: 'At least one product is required',
    duplicateFinalProducts: 'Duplicate products are not allowed',
    finalProductIdRequired: 'Product ID is required',
    unitPriceRequired: 'Unit price is required',
    quantityRequired: 'Quantity is required',
    operationsExceedQuantity: 'Operations cannot exceed quantity ({quantity})',
    operationNameRequired: 'Operation name is required',
    operationPriceRequired: 'Operation price is required',
    operationDetailsRequired: 'Operation details is required',
    additionalCostNameRequired: 'Cost name is required',
    additionalCostValueRequired: 'Cost value is required',
    additionalDiscountNameRequired: 'Discount name is required',
    additionalDiscountValueRequired: 'Discount value is required',

    amountRequired: 'Amount Required',
    paymentMethodIdRequired: 'Payment method is required',
    bankAccountIdRequired: 'Bank account is required',
    cashBoxIdRequired: 'Cash box is required',
    walletIdRequired: 'Wallet is required',
  },
}
