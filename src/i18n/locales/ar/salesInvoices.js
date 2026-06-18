export default {
  title: 'فواتير المبيعات',
  base_info: 'المعلومات الاساسية',
  id: '#',
  name: 'الاسم',
  reference_code: 'الرقم المرجعي',
  total_additional_taxes: 'اجمالي الضريبة',
  grand_total: 'اجمالي المبلغ شامل الضريبة',
  stage_updated_at: 'تاريخ تحديث المرحلة',
  is_closed: 'مغلقة',
  is_active: 'نشط؟',
  date_from: 'تاريخ من',
  date_to: 'تاريخ الي',
  net_amount: 'صافي المبلغ',
  net_amount_after_costs_and_discounts: 'المبلغ الاجمالي',
  returns: 'المرتجعات',

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
  contact: 'المورد',
  contacts: 'الموردون',
  select_contact: 'اختر المورد',

  /////////////////////////////
  payment_type: 'نوع الدفع',
  payment_types: 'نوع الدفع',
  select_payment_type: 'اختر نوع الدفع',

  /////////////////////////////
  warehouse: 'المخزن / المستودع',
  warehouses: 'المخازن / المستودعات',
  select_warehouse: 'اختر مخزن / مستودع',

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
  employee: 'الموظف',
  invoice_payment_status: 'حالة الدفع',
  payments: 'المدفوعات',
  paid_amount: 'المبلغ المدفوع',
  remaining_amount: 'المبلغ المتبقي',
  paid_at: 'تاريخ اتمام الدفع',

  /////////////////////////////
  additional_costs: 'التكاليف الاضافية',
  total_additional_costs: 'اجمالي التكاليف الاضافية',
  additional_discounts: 'الخصومات الاضافية',
  total_additional_discounts: 'اجمالي الخصومات الاضافية',
  value: 'القيمة',

  /////////////////////////////
  operations: 'العمليات علي المنتج',
  price: 'السعر',
  details: 'تفاصيل العملية',
  files: 'ملفات العملية',
  total_operations_cost: 'اجمالي تكلفة العمليات',

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
    finalProductIdRequired: 'معرف المنتج مطلوب',
    unitPriceRequired: 'سعر الوحدة مطلوب',
    quantityRequired: 'الكمية مطلوبة',
    operationsExceedQuantity: 'عدد العمليات لا يمكن أن يتجاوز الكمية ({quantity})',
    operationNameRequired: 'اسم العملية مطلوب',
    operationPriceRequired: 'سعر العملية مطلوب',
    operationDetailsRequired: 'تفاصيل العملية مطلوب',
    additionalCostNameRequired: 'اسم التكلفة مطلوب',
    additionalCostValueRequired: 'قيمة التكلفة مطلوبة',
    additionalDiscountNameRequired: 'اسم الخصم مطلوب',
    additionalDiscountValueRequired: 'قيمة الخصم مطلوبة',
  },
}
