const BASE_URL = import.meta.env.VITE_API_URL || 'https://www.ngcis.com/ERP/public/api'
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
    BASE: `${BASE_URL}/admin/company/branch`,
  },
  WAREHOUSE: {
    SEARCH: `${BASE_URL}/admin/company/warehouses/search`,
    BASE: `${BASE_URL}/admin/company/warehouse`,
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
}
