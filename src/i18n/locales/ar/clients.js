export default {
  title: 'العملاء',
  id: '#',
  name: 'الاسم',
  email: 'البريد الإلكتروني',
  phone: 'الهاتف',
  address: 'العنوان',
  password: 'كلمة المرور',
  confirmPassword: 'تأكيد كلمة المرور',
  accountType: 'نوع الحساب',
  createdAt: 'تاريخ الإنشاء',
  updatedAt: 'تاريخ التعديل',
  passwordLeaveBlank: 'كلمة المرور (اتركها فارغة للإبقاء على نفسها)',
  selectAccountType: 'اختر نوع الحساب',
  allAccountTypes: 'كل أنواع الحسابات',
  avatar: 'الصورة الشخصية',

  // Validation messages
  validation: {
    nameRequired: 'الاسم مطلوب',
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordMinLength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    confirmPasswordRequired: 'يرجى تأكيد كلمة المرور',
    passwordsDoNotMatch: 'كلمة المرور غير متطابقة',
    accountTypeRequired: 'نوع الحساب مطلوب',
    phoneRequired: 'رقم الهاتف مطلوب',
  },

  // Success messages
  success: {
    created: 'تم إنشاء المستخدم بنجاح',
    updated: 'تم تحديث المستخدم بنجاح',
    deleted: 'تم حذف المستخدم بنجاح',
  },

  // Error messages
  error: {
    notFound: 'المستخدم غير موجود',
    emailExists: 'البريد الإلكتروني موجود بالفعل',
    phoneExists: 'رقم الهاتف موجود بالفعل',
    createFailed: 'فشل إنشاء المستخدم',
    updateFailed: 'فشل تحديث المستخدم',
    deleteFailed: 'فشل حذف المستخدم',
  },
}
