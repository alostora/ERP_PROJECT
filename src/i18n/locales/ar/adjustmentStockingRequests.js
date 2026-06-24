export default {
  title: 'طلبات ضبط المخزون',
  base_info: 'المعلومات الاساسية',
  id: '#',
  name: 'الاسم',
  grand_total: 'اجمالي المبلغ شامل الضريبة',
  stage_updated_at: 'تاريخ تحديث المرحلة',
  is_closed: 'مغلقة',
  is_active: 'نشط؟',
  date_from: 'تاريخ من',
  date_to: 'تاريخ الي',
  net_amount: 'صافي المبلغ',

  /////////////////////////////
  company: 'الشركة',

  /////////////////////////////
  categories: 'الاقسام',
  category: 'القسم',
  select_category: 'اختر قسم',

  /////////////////////////////
  final_products: 'المنتجات',
  final_product: 'المنتج',
  select_final_product: 'اختر المنتج',

  /////////////////////////////
  branches: 'الفروع',
  branch: 'الفرع',
  select_branch: 'اختر الفرع',

  /////////////////////////////
  type_code: 'نوع العملية',
  select_type_code: 'اختر نوع العملية',
  in: 'دخول',
  out: 'خروج',

  /////////////////////////////
  warehouse: 'المخزن / المستودع',
  warehouses: 'المخازن / المستودعات',
  select_warehouse: 'اختر مخزن / مستودع',

  /////////////////////////////
  quantity: 'الكمية',
  unit_price: 'سعر الوحدة',
  measurement_unit: 'وحدة القياس',
  total_price: 'اجمالي السعر',
  subtotal: 'المجموع الفرعي',

  /////////////////////////////
  stage: 'المرحلة',
  stage_comment: 'ملاحظلات علي المرحلة',
  employee: 'الموظف',

  /////////////////////////////
  total_summary: 'الملخص الإجمالي',

  /////////////////////////////

  createdAt: 'تاريخ الإنشاء',

  /////////////////////////////
  // Arabic
  validation: {
    companyIdRequired: 'الشركة مطلوبة',
    branchIdRequired: 'الفرع مطلوب',
    warehouseIdRequired: 'المخزن مطلوب',
    finalProductsRequired: 'يجب إضافة منتج واحد على الأقل',
    duplicateFinalProducts: 'لا يمكن إضافة نفس المنتج مرتين',
    finalProductIdRequired: 'المنتج مطلوب',
    unitPriceRequired: 'سعر الوحدة مطلوب',
    quantityRequired: 'الكمية مطلوبة',
    nameRequired: 'الاسم مطلوبة',
    typeCodeRequired: 'نوع العملية مطلوب',
  },
}
