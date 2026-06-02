export default {
  title: 'ضرائب القسم الضريبي',
  id: '#',
  taxCategory: {
    name: 'اسم فئة الضريبة',
    nameAr: 'اسم فئة الضريبة (عربي)',
    is_default: 'افتراضي؟',
    is_active: 'نشط؟',
    is_system: 'تابع للنظام؟',
  },
  tax: {
    noTaxes: 'لا توجد ضرائب',
    addTax: 'إضافة ضريبة',
    tax: 'الضريبة',
    taxes: 'الضرائب',
    name: 'اسم الضريبة',
    nameAr: 'اسم الضريبة (عربي)',
    is_default: 'افتراضي؟',
    value: 'معدل الضريبة',
    is_active: 'نشط؟',
    is_system: 'تابع للنظام؟',
    type: 'نوع الضريبة',
  },

  fixedAmountOverride: 'مبلغ ثابت بديل',
  sortOrder: 'التسلسل',
  isSystem: 'نظامي',
  createdAt: 'تاريخ الإنشاء',

  validation: {
    taxIdRequired: 'معرف الضريبة مطلوب',
    taxIdExists: 'الضريبة غير موجودة',
    taxCategoryIdRequired: 'فئة الضريبة مطلوبة',
    fixedAmountOverrideNumeric: 'المبلغ الثابت البديل يجب أن يكون رقماً',
    sortOrderRequired: 'التسلسل مطلوب',
    sortOrderInteger: 'التسلسل يجب أن يكون رقم صحيح',
    atLeastOneTax: 'يجب إضافة ضريبة واحدة على الأقل',
  },
}
