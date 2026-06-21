import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      finalProductUrl: API_ROUTES.FINAL_PRODUCT.LIST,
      finalProducts: [],
    }
  },

  methods: {
    async loadFinalProducts(companyId, discountId = null) {
      try {
        const params = { discount_id: discountId }
        const response = await API.get(`${this.finalProductUrl}/${companyId}`, { params })
        this.finalProducts = response.data.data || []
      } catch (error) {}
    },
  },
}

export default customFunctions
