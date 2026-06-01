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
}
