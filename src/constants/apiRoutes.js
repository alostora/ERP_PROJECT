const BASE_URL = import.meta.env.VITE_API_URL || 'https://www.back.ngcis.com/api'
import LOOKUP_TYPES from '@/constants/lookupTypes'

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
  },
  LOOKUP: {
    ACCOUNT_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.USER_ACCOUNT_TYPE}`,
    CURRENCIES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.CURRENCY}`,
    STAGE_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.STAGE_TYPE}`,
    TAX_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.TAX_TYPE}`,
    DISCOUNT_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.DISCOUNT_TYPE}`,
    ACCOUNT_GUIDE_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.ACCOUNT_GUIDE_TYPE}`,
    ACCOUNT_GUIDE_NATURE_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.ACCOUNT_GUIDE_NATURE_TYPE}`,
    TRANSFER_MONEY_STATUS: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.TRANSFER_MONEY_STATUS}`,
    PAYMENT_METHOD: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.PAYMENT_METHOD}`,
    PAYMENT_STATUS: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.PAYMENT_STATUS}`,
    PAYMENT_TYPE: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.PAYMENT_TYPE}`,
  },
  USER: {
    SEARCH: `${BASE_URL}/admin/users/search`,
    BASE: `${BASE_URL}/admin/user`,
  },
  CLIENT: {
    SEARCH: `${BASE_URL}/admin/clients/search`,
    BASE: `${BASE_URL}/admin/client`,
  },
  COUNTRY: {
    SEARCH: `${BASE_URL}/admin/countries/search`,
    BASE: `${BASE_URL}/admin/country`,
  },
  GOVERNORATE: {
    SEARCH: `${BASE_URL}/admin/governorates-search-all`,
    BASE: `${BASE_URL}/admin/governorate`,
  },
  CITY: {
    SEARCH: `${BASE_URL}/admin/cities-search-all`,
    BASE: `${BASE_URL}/admin/city`,
  },
  COMPANY: {
    SEARCH: `${BASE_URL}/admin/companies/search`,
    BASE: `${BASE_URL}/admin/company`,
  },
  BRANCH: {
    SEARCH: `${BASE_URL}/admin/company/branches/search`,
    LIST: `${BASE_URL}/admin/company/branches/list`,
    BASE: `${BASE_URL}/admin/company/branch`,
    SET_DEFAULT: `${BASE_URL}/admin/company/branch-set-default`,
  },
  WAREHOUSE: {
    SEARCH: `${BASE_URL}/admin/company/branch/warehouses/search`,
    BASE: `${BASE_URL}/admin/company/branch/warehouse`,
    SET_DEFAULT: `${BASE_URL}/admin/company/branch/warehouse-set-default`,
  },
  MEASUREMENT_UNIT_GROUP: {
    SEARCH: `${BASE_URL}/admin/company/measurement-unit-groups/search`,
    BASE: `${BASE_URL}/admin/company/measurement-unit-group`,
  },
  MEASUREMENT_UNIT: {
    SEARCH: `${BASE_URL}/admin/company/measurement-units/search`,
    BASE: `${BASE_URL}/admin/company/measurement-unit`,
  },
  VARIANT: {
    SEARCH: `${BASE_URL}/admin/company/variants/search`,
    LIST: `${BASE_URL}/admin/company/variants/list`,
    BASE: `${BASE_URL}/admin/company/variant`,
  },
  VARIANT_VALUE: {
    SEARCH: `${BASE_URL}/admin/company/variant-values/search`,
    BASE: `${BASE_URL}/admin/company/variant-value`,
  },
  CATEGORY: {
    SEARCH: `${BASE_URL}/admin/company/categories/search`,
    BASE: `${BASE_URL}/admin/company/category`,
  },
  PRODUCT: {
    SEARCH: `${BASE_URL}/admin/company/products/search`,
    BASE: `${BASE_URL}/admin/company/product`,
  },
  FINAL_PRODUCT: {
    SEARCH: `${BASE_URL}/admin/company/product/company-final-products/search`,
    LIST: `${BASE_URL}/admin/company/product/final-products/list`,
    BASE: `${BASE_URL}/admin/company/product/final-product`,
  },
  FINAL_PRODUCT_VARIANT_VALUE: {
    SEARCH: `${BASE_URL}/admin/company/product/final-product-variant-values/search`,
    BASE: `${BASE_URL}/admin/company/product/final-product-variant-value`,
  },
  STAGE: {
    SEARCH: `${BASE_URL}/admin/company/stages/search`,
    BASE: `${BASE_URL}/admin/company/stage`,
    SET_DEFAULT: `${BASE_URL}/admin/company/stage-set-default`,
    SET_AFFECTS_STOCK: `${BASE_URL}/admin/company/stage-set-affects-stock`,
    SET_SORT: `${BASE_URL}/admin/company/stage-set-sort`,
  },
  TAX: {
    SEARCH: `${BASE_URL}/admin/company/taxes/search`,
    LIST: `${BASE_URL}/admin/company/taxes/list`,
    BASE: `${BASE_URL}/admin/company/tax`,
    SET_ACTIVE: `${BASE_URL}/admin/company/tax/set-active`,
    SET_INACTIVE: `${BASE_URL}/admin/company/tax/set-inactive`,
  },
  TAX_CATEGORY: {
    SEARCH: `${BASE_URL}/admin/company/tax-categories/search`,
    BASE: `${BASE_URL}/admin/company/tax-category`,
    SET_ACTIVE: `${BASE_URL}/admin/company/tax-category/set-active`,
    SET_INACTIVE: `${BASE_URL}/admin/company/tax-category/set-inactive`,
    SET_DEFAULT: `${BASE_URL}/admin/company/tax-category/set-default`,
    ATTACH_TAXES: `${BASE_URL}/admin/company/tax-category/attach-taxes`, //method: post, body: { taxes: [tax_id=>required, fixed_amount_override=>nullable] }
    REPLACE_TAXES: `${BASE_URL}/admin/company/tax-category/sync-taxes`, //method: post, body: { taxes: [tax_id=>required, fixed_amount_override=>nullable] }
    DELETE_TAXES: `${BASE_URL}/admin/company/tax-category/detach-taxes`, //method: delete, body: { tax_ids: [] }
  },
  TAX_CATEGORY_TAX: {
    SEARCH: `${BASE_URL}/admin/company/tax-category-taxes/search`,
    BASE: `${BASE_URL}/admin/company/tax-category-tax`,
    UPDATE: `${BASE_URL}/admin/company/tax-category-tax/update-tax-pivot`, //method: patch, body: { taxes: [fixed_amount_override=>nullable] }
    SET_SORT: `${BASE_URL}/admin/company/tax-category-tax/tax-category-tax-set-sort`, //method: patch, body: { taxes: [new_position=>required] }

    ATTACH_TAXES: `${BASE_URL}/admin/company/tax-category/attach-taxes`, //method: post, body: { taxes: [tax_id=>required, fixed_amount_override=>nullable] }
    DELETE_TAX: `${BASE_URL}/admin/company/tax-category/detach-tax`, //method: delete, {taxCategoryId}/{taxId} }
  },
  EMPLOYEE: {
    SEARCH: `${BASE_URL}/admin/company/employees/search`,
    BASE: `${BASE_URL}/admin/company/employee`,
  },
  CONTACT: {
    SEARCH: `${BASE_URL}/admin/company/contacts/search`,
    BASE: `${BASE_URL}/admin/company/contact`,
  },
  CONTACT_PHONE: {
    SEARCH: `${BASE_URL}/admin/company/contact-phones/search`,
    BASE: `${BASE_URL}/admin/company/contact-phone`,
  },
  CONTACT_ADDRESS: {
    SEARCH: `${BASE_URL}/admin/company/contact-addresses/search`,
    BASE: `${BASE_URL}/admin/company/contact-address`,
  },
  CONTACT_EMAIL: {
    SEARCH: `${BASE_URL}/admin/company/contact-emails/search`,
    BASE: `${BASE_URL}/admin/company/contact-email`,
  },
  DISCOUNT: {
    SEARCH: `${BASE_URL}/admin/company/discounts/search`,
    BASE: `${BASE_URL}/admin/company/discount`,
  },
  DISCOUNT_BRANCH: {
    SEARCH: `${BASE_URL}/admin/company/discount-branches/search`,
    BASE: `${BASE_URL}/admin/company/discount-branch`,
  },
  DISCOUNT_FINAL_PRODUCT: {
    SEARCH: `${BASE_URL}/admin/company/discount-final-products/search`,
    BASE: `${BASE_URL}/admin/company/discount-final-product`,
  },
  ACCOUNT_GUIDE: {
    SEARCH: `${BASE_URL}/admin/company/account-guides/search`,
    BASE: `${BASE_URL}/admin/company/account-guide`,
  },
  CASH_BOX: {
    SEARCH: `${BASE_URL}/admin/company/cash-boxes/search`,
    BASE: `${BASE_URL}/admin/company/cash-box`,
    SET_DEFAULT: `${BASE_URL}/admin/company/cash-box/set-default`,
    SET_ACTIVE: `${BASE_URL}/admin/company/cash-box/set-active`,
    SET_INACTIVE: `${BASE_URL}/admin/company/cash-box/set-inactive`,
  },
  CASH_BOX_SHIFT: {
    SEARCH: `${BASE_URL}/admin/company/cash-box-shifts/search`,
    BASE: `${BASE_URL}/admin/company/cash-box-shift`,
    OPEN: `${BASE_URL}/admin/company/cash-box-shift/open`,
    CLOSE: `${BASE_URL}/admin/company/cash-box-shift/close`,
  },
  BANK_ACCOUNT: {
    SEARCH: `${BASE_URL}/admin/company/bank-accounts/search`,
    BASE: `${BASE_URL}/admin/company/bank-account`,
    SET_DEFAULT: `${BASE_URL}/admin/company/bank-account/set-default`,
    SET_ACTIVE: `${BASE_URL}/admin/company/bank-account/set-active`,
    SET_INACTIVE: `${BASE_URL}/admin/company/bank-account/set-inactive`,
  },
  WALLET: {
    SEARCH: `${BASE_URL}/admin/company/wallets/search`,
    BASE: `${BASE_URL}/admin/company/wallet`,
    SET_DEFAULT: `${BASE_URL}/admin/company/wallet/set-default`,
    SET_ACTIVE: `${BASE_URL}/admin/company/wallet/set-active`,
    SET_INACTIVE: `${BASE_URL}/admin/company/wallet/set-inactive`,
  },
  TRANSFER_MONEY: {
    SEARCH: `${BASE_URL}/admin/company/transfer-moneys/search`,
    BASE: `${BASE_URL}/admin/company/transfer-money`,
    SET_STATUS: `${BASE_URL}/admin/company/transfer-money/set-status`,
  },
  PAYMENT: {
    SEARCH: `${BASE_URL}/admin/company/payments/search`,
    BASE: `${BASE_URL}/admin/company/payment`,
    SET_STATUS: `${BASE_URL}/admin/company/payment/set-status`,
    CREATE_INVOICE_PAYMENT: `${BASE_URL}/admin/company/invoice-payments`,
  },
  PURCHASES_INVOICE: {
    SEARCH: `${BASE_URL}/admin/company/purchases/invoices/search`,
    BASE: `${BASE_URL}/admin/company/purchases/invoice`,
    UPDATE_STAGE: `${BASE_URL}/admin/company/purchases/invoice-stage`,
    UPDATE_STAGE_ACTION: `${BASE_URL}/admin/company/purchases/invoice-stage-action`,
    FINAL_PRODUCTS: `${BASE_URL}/admin/company/purchases/invoice-final-products/search`,
  },
  PURCHASES_INVOICE_RETURN: {
    SEARCH: `${BASE_URL}/admin/company/purchases/invoice-returns/search`,
    BASE: `${BASE_URL}/admin/company/purchases/invoice-return`,
    UPDATE_STAGE: `${BASE_URL}/admin/company/purchases/invoice-return-stage`,
    UPDATE_STAGE_ACTION: `${BASE_URL}/admin/company/purchases/invoice-return-action`,
  },
  SALES_INVOICE: {
    SEARCH: `${BASE_URL}/admin/company/sales/invoices/search`,
    BASE: `${BASE_URL}/admin/company/sales/invoice`,
    UPDATE_STAGE: `${BASE_URL}/admin/company/sales/invoice-stage`,
    UPDATE_STAGE_ACTION: `${BASE_URL}/admin/company/sales/invoice-stage-action`,
    FINAL_PRODUCTS: `${BASE_URL}/admin/company/sales/invoice-final-products/search`,
  },
  SALES_INVOICE_RETURN: {
    SEARCH: `${BASE_URL}/admin/company/sales/invoice-returns/search`,
    BASE: `${BASE_URL}/admin/company/sales/invoice-return`,
    UPDATE_STAGE: `${BASE_URL}/admin/company/sales/invoice-return-stage`,
    UPDATE_STAGE_ACTION: `${BASE_URL}/admin/company/sales/invoice-return-action`,
  },
  STOCKING_REQUEST: {
    SEARCH: `${BASE_URL}/admin/company/stock-management/stocking-requests/search`,
    BASE: `${BASE_URL}/admin/company/stock-management/stocking-request`,
    UPDATE_STAGE: `${BASE_URL}/admin/company/stock-management/stocking-request-stage`,
    UPDATE_STAGE_ACTION: `${BASE_URL}/admin/company/stock-management/stocking-request-stage-action`,
  },
}
