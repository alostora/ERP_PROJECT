import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      variantUrl: API_ROUTES.VARIANT.SEARCH,
      variants: [],
    }
  },
  methods: {
    async loadVariants(companyId) {
      try {
        const response = await API.get(`${this.variantUrl}/${companyId}`)
        this.variants = response.data.data || []
      } catch (error) {
        console.error('Error loading variants:', error)
      }
    },
  },
}

export default customFunctions
