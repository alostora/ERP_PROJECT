import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      lookupUrl: API_ROUTES.LOOKUP.ACCOUNT_TYPES,
      accountTypes: [],
    }
  },
  methods: {
    async loadAccountTypes() {
      try {
        const response = await API.get(`${this.lookupUrl}`)
        this.accountTypes = response.data.data || []
      } catch (error) {
        console.error('Error loading account types:', error)
      }
    },
  },
}

export default customFunctions
