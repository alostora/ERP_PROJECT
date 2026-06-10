import transferMoneys from './transferMoneys'

export default {
  // Buttons
  create: 'إنشاء',
  edit: 'تعديل',
  update: 'تحديث',
  delete: 'حذف',
  save: 'حفظ',
  cancel: 'إلغاء',
  cancelled: 'ملغي',
  search: 'بحث',
  clear: 'مسح',
  filter: 'فلتر',
  reset: 'إعادة تعيين',
  close: 'إغلاق',
  back: 'رجوع',
  addNew: 'إضافة جديد',

  confirm: 'تأكيد',
  confirmYes: 'نعم',
  confirmNo: 'إلغاء',
  confirmSetDefault: 'تأكيد تعيين كافتراضي',
  confirmSetActive: 'تأكيد تعيين كمفعل',
  confirmSetInactive: 'تأكيد تعيين كغير مفعل',
  confirmDeleteTitle: 'تأكيد الحذف',
  confirmDeleteMessage: 'هل أنت متأكد من حذف "{itemName}"؟',
  confirmDeleteYes: 'نعم، احذف',
  confirmDeleteNo: 'إلغاء',
  empty: 'فارغ',

  yes: 'نعم',
  no: 'لا',
  default: 'افتراضي',

  // Messages (Headers)
  success: 'نجاح',
  error: 'خطأ',
  warning: 'تحذير',
  info: 'معلومة',

  // Table
  actions: 'إجراءات',
  noData: 'لا توجد بيانات',
  loading: 'جاري التحميل...',
  perPage: 'في الصفحة',
  showing: 'عرض',
  to: 'إلى',
  of: 'من',
  results: 'نتيجة',

  // Pagination
  firstPage: 'الصفحة الأولى',
  lastPage: 'الصفحة الأخيرة',
  previousPage: 'السابق',
  nextPage: 'التالي',

  // Form Labels
  required: 'مطلوب',
  optional: 'اختياري',
  status: 'الحالة',
  active: 'نشط',
  inactive: 'غير نشط',
  all: 'الكل',

  // Page Titles
  createTitle: 'إنشاء {module}',
  updateTitle: 'تعديل {module}',
  showTitle: 'تفاصيل {module}',

  // Success Messages
  createdSuccessfully: 'تم الإنشاء بنجاح',
  updatedSuccessfully: 'تم التحديث بنجاح',
  deletedSuccessfully: 'تم الحذف بنجاح',
  savedSuccessfully: 'تم الحفظ بنجاح',

  // Error Messages
  createFailed: 'فشل الإنشاء',
  updateFailed: 'فشل التحديث',
  deleteFailed: 'فشل الحذف',
  saveFailed: 'فشل الحفظ',
  fetchFailed: 'فشل تحميل البيانات',
  networkError: 'خطأ في الشبكة',
  validationError: 'خطأ في التحقق',

  // Common
  select: 'اختر',
  currency: 'العملة',
  currencyCode: 'كود العملة',
  code: 'الكود',
  view: 'عرض',

  // Navigation Menu
  menu: {
    dashboard: 'لوحة التحكم',

    //////
    userManagement: 'إدارة المستخدمين',
    users: 'المستخدمين',
    allUsers: 'جميع المستخدمين',

    //////
    locations: 'المواقع',
    countries: 'الدول',
    governorates: 'المحافظات',
    cities: 'المدن',

    //////
    companiesGroup: 'الشركات',
    companies: 'الشركات',
    allCompanies: 'جميع الشركات',
    companyManagement: 'إدارة الشركة',
    companyDetails: 'تفاصيل الشركة',

    //////
    settingsGroup: 'الإعدادات',
    operationsStages: 'مراحل العمليات',
    taxes: 'الضرائب',
    taxCategories: 'فئات الضرائب',
    employees: 'الموظفين',
    contacts: 'جهات الاتصال',

    //////
    productProperties: 'المنتجات والخصائص',
    measurementUnitGroups: 'مجموعات وحدات القياس',
    measurementUnits: 'وحدات القياس',
    variants: 'الخصائص',
    categories: 'الأقسام',
    products: 'الأصناف',
    finalProducts: 'المنتجات النهائية',
    discounts: 'الخصومات',

    //////
    financial: 'المالية',
    accountGuides: 'دليل الحسابات',
    cashBoxes: 'صناديق النقدية',
    bankAccounts: 'حسابات البنوك',
    wallets: 'المحافظ الالكترونية',
    transferMoneys: 'حركة / تنقلات الاموال',
    payments: 'قيود اليومية / المدفوعات',

    //////
    branchManagement: 'إدارة الفرع',
    branchesGroup: 'الفروع',
    branches: 'الفروع',
    allBranches: 'جميع الفروع',
    branchDetails: 'تفاصيل الفرع',
    branchEmployees: 'موظفي الفرع',
    warehouses: 'المستودعات',

    //////
    invoices: 'الفواتير',
    purchaseInvoices: 'فواتير المشتريات',

    //////
    //////
    //////
    //////

    salesGroup: 'المبيعات والفواتير',
    reportsGroup: 'التقارير',

    businessOperations: 'العمليات التجارية',

    roles: 'الصلاحيات',
    permissions: 'الأذونات',
    backToList: 'العودة للقائمة',

    orders: 'الطلبات',
    invoices: 'الفواتير',

    salesReports: 'تقارير المبيعات',
    inventoryReports: 'تقارير المخزون',
    financialReports: 'التقارير المالية',

    generalSettings: 'الإعدادات العامة',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
  },
}
