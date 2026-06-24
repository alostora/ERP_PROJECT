export default {
  title: 'Stock Transport',
  base_info: 'Base Information',
  id: '#',
  name: 'Name',
  details: 'Details',
  company: 'Company',

  branch: 'Branch',
  branches: 'Branches',

  from_branch: 'From Branch',
  to_branch: 'To Branch',

  warehouse: 'Warehouse',
  warehouses: 'Warehouses',

  from_warehouse: 'From Warehouse',
  to_warehouse: 'To Warehouse',

  from_warehouse_stage: 'From WarehouseStage',
  to_warehouse_stage: 'To WarehouseStage',

  from_warehouse_is_closed: 'From Warehouse Stage Is Closed?',
  to_warehouse_is_closed: 'To Warehouse Is Stage Closed?',

  from: 'Transport From',
  to: 'Transport To',

  date_from: 'Date From',
  date_to: 'Date To',
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
  /////////////////////////////

  final_products: 'Products',
  final_product: 'Product',
  select_final_product: 'Select Product',
  /////////////////////////////

  total_summary: 'Total Summary',
  grand_total: 'Grand Total (Including Tax)',

  createdAt: 'Created At',
  validation: {
    companyIdRequired: 'Company is required',
    branchIdRequired: 'Branch is required',
    fromIdRequired: 'Transport from warehouse is required',
    toIdRequired: 'Transport to warehouse is required',
    warehousesMustBeDifferent: 'Source and destination warehouses must be different',
    finalProductsRequired: 'At least one product is required',
    duplicateFinalProducts: 'Duplicate products are not allowed',
    finalProductIdRequired: 'Product ID is required',
    quantityRequired: 'Quantity is required',
    stageIdRequired: 'Stage Is Required',
    nameRequired: 'Name Is Required',
  },
}
