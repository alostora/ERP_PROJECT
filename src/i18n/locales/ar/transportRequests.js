export default {
  title: 'نقل المخزون',
  base_info: 'المعلومات الاساسية',
  id: '#',
  name: 'الاسم',
  details: 'التفاصيل',
  company: 'الشركة',

  branch: 'الفرع',
  branches: 'الفروع',

  from_branch: 'من فرع',
  to_branch: 'إلى فرع',

  warehouse: 'المستودع',
  warehouses: 'المستودعات',

  from_warehouse: 'من مستودع',
  to_warehouse: 'إلى مستودع',

  from_warehouse_stage: 'مرحلة المصدر',
  to_warehouse_stage: 'مرحلة الوجهة',

  from_warehouse_is_closed: 'مرحلة المصدر مكتملة؟',
  to_warehouse_is_closed: 'مرحلة الوجهة مكتملة؟',

  from: 'نقل من',
  to: 'نقل إلى',

  date_from: 'تاريخ من',
  date_to: 'تاريخ الي',

  /////////////////////////////
  final_products: 'المنتجات',
  final_product: 'المنتج',
  select_final_product: 'اختر المنتج',

  /////////////////////////////
  quantity: 'الكمية',
  unit_price: 'سعر الوحدة',
  measurement_unit: 'وحدة القياس',
  total_price: 'اجمالي السعر',
  total_price_plus_operations: 'اجمالي السعر بالاضافة الي العمليات',
  subtotal: 'المجموع الفرعي',
  /////////////////////////////
  stage: 'المرحلة',
  stage_comment: 'ملاحظلات علي المرحلة',

  /////////////////////////////
  total_summary: 'الملخص الإجمالي',
  grand_total: 'اجمالي المبلغ شامل الضريبة',

  createdAt: 'تاريخ الإنشاء',
  validation: {
    companyIdRequired: 'الشركة مطلوبة',
    branchIdRequired: 'الفرع مطلوب',
    fromIdRequired: 'نقل من المستودع مطلوب',
    toIdRequired: 'نقل إلى المستودع مطلوب',
    warehousesMustBeDifferent: 'يجب أن يكون المستودع المصدر مختلفاً عن المستودع الوجهة',
    finalProductsRequired: 'مطلوب منتج واحد على الأقل',
    duplicateFinalProducts: 'المنتجات المكررة غير مسموحة',
    finalProductIdRequired: 'معرف المنتج مطلوب',
    quantityRequired: 'الكمية مطلوبة',
    stageIdRequired: 'المرحلة مطلوبة',
    nameRequired: 'الاسم مطلوب',
  },
}
