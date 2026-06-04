import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      discountTypeUrl: API_ROUTES.LOOKUP.DISCOUNT_TYPES,
      discountTypes: [],
      finalProductUrl: API_ROUTES.FINAL_PRODUCT.SEARCH,
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

    removeFinalProduct(id) {
      this.formData.final_product_ids = this.formData.final_product_ids.filter((i) => i !== id)
    },

    removeBranch(id) {
      this.formData.branch_ids = this.formData.branch_ids.filter((i) => i !== id)
    },

    getSelectedFinalProductName(id) {
      if (!id) return ''
      const item = this.finalProducts.find((p) => p.id === id)
      return item ? (this.currentLanguage === 'ar' ? item.name_ar : item.name) : ''
    },

    getSelectedBranchName(id) {
      if (!id) return ''
      const item = this.branches.find((b) => b.id === id)
      return item ? (this.currentLanguage === 'ar' ? item.name_ar : item.name) : ''
    },
  },
}

export default customFunctions
