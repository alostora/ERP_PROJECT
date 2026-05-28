const BASE_URL = import.meta.env.VITE_API_URL || 'https://www.ngcis.com/ERP/public/api'
import LOOKUP_TYPES from '@/constants/lookupTypes'

export const API_ROUTES = {
     AUTH: {
          LOGIN: `${BASE_URL}/auth/login`,
     },
     LOOKUP: {
          ACCOUNT_TYPES: `${BASE_URL}/system-lookups/${LOOKUP_TYPES.LOOKUP_TYPES.USER_ACCOUNT_TYPE}`,
     },
     USER: {
          SEARCH: `${BASE_URL}/admin/users/search`,
          BASE: `${BASE_URL}/admin/user`,
     },
     COUNTRY: {
          SEARCH: `${BASE_URL}/admin/countries/search`,
          BASE: `${BASE_URL}/admin/country`,
     },
     GOVERNORATE: {
          SEARCH: `${BASE_URL}/admin/governorates-search-all`,
          BASE: `${BASE_URL}/admin/governorate`,
     }
}