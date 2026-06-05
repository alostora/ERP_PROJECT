import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      discountTypeUrl: API_ROUTES.LOOKUP.DISCOUNT_TYPES,
      discountTypes: [],
      finalProductUrl: API_ROUTES.FINAL_PRODUCT.LIST,
      branchUrl: API_ROUTES.BRANCH.LIST,
      finalProducts: [],
      branches: [],
    }
  },

  methods: {
    async loadDiscountTypes() {
      try {
        const response = await API.get(`${this.discountTypeUrl}`)
        this.discountTypes = response.data.data || []
      } catch (error) {
        console.error('Error loading discounts types:', error)
      }
    },

    async loadFinalProducts(companyId) {
      try {
        const response = await API.get(`${this.finalProductUrl}/${companyId}`)
        this.finalProducts = response.data.data || []
      } catch (error) {
        console.error('Error loading final products:', error)
      }
    },

    async loadBranches(companyId) {
      try {
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {
        console.error('Error loading branches:', error)
      }
    },
  },
}

export default customFunctions
