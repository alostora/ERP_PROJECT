export default {
  title: 'Adjustment Stocking Requests',
  base_info: 'Basic Information',
  id: '#',
  name: 'Name',
  grand_total: 'Grand Total (Including Tax)',
  stage_updated_at: 'Stage Updated Date',
  is_closed: 'Closed',
  is_active: 'Active?',
  date_from: 'Date From',
  date_to: 'Date To',
  net_amount: 'Net Amount',

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
  type_code: 'Operation Type',
  select_type_code: 'Select Operation Type',
  in: 'In',
  out: 'Out',

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
  stage_comment: 'Stage Notes',
  employee: 'Employee',

  /////////////////////////////
  total_summary: 'Total Summary',

  /////////////////////////////
  createdAt: 'Created At',

  /////////////////////////////
  validation: {
    companyIdRequired: 'Company is required',
    branchIdRequired: 'Branch is required',
    warehouseIdRequired: 'Warehouse is required',
    finalProductsRequired: 'At least one product must be added',
    duplicateFinalProducts: 'Cannot add the same product twice',
    finalProductIdRequired: 'Product ID is required',
    unitPriceRequired: 'Unit price is required',
    quantityRequired: 'Quantity is required',
  },
}
