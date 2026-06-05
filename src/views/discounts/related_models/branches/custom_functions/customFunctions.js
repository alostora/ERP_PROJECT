import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      branchUrl: API_ROUTES.BRANCH.LIST,
      branches: [],
    }
  },

  methods: {
    async loadBranches(companyId, discountId = null) {
      try {
        const params = { discount_id: discountId }
        const response = await API.get(`${this.branchUrl}/${companyId}`, { params })
        this.branches = response.data.data || []
      } catch (error) {
        console.error('Error loading branches:', error)
      }
    },
  },
}

export default customFunctions
