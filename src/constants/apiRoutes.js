const BASE_URL = import.meta.env.VITE_API_URL || 'https://www.ngcis.com/ERP/public/api'
import LOOKUP_TYPES from '@/constants/lookupTypes'

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
  },
  LOOKUP: {
    ACCOUNT_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.USER_ACCOUNT_TYPE}`,
    CURRENCIES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.CURRENCY}`,
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
  CATEGORY: {
    SEARCH: `${BASE_URL}/admin/company/categories/search`,
    BASE: `${BASE_URL}/admin/company/category`,
  },
}
