import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      finalProductFilters: {
        branch_id: '',
        category_id: '',
      },

      finalProductUrl: API_ROUTES.FINAL_PRODUCT.SEARCH,
      finalProducts: [],

      branchUrl: API_ROUTES.BRANCH.SEARCH,
      branches: [],

      warehouseUrl: API_ROUTES.WAREHOUSE.SEARCH,
      warehouses: [],

      contactUrl: API_ROUTES.CONTACT.SEARCH,
      contacts: [],

      paymentTypeUrl: API_ROUTES.LOOKUP.PAYMENT_TYPE,
      paymentTypes: [],
    }
  },

  methods: {
    async loadFinalProducts(companyId) {
      try {
        this.formLoading = true
        const params = this.finalProductFilters
        const response = await API.get(`${this.finalProductUrl}/${companyId}`, { params })
        this.finalProducts = response.data.data || []
      } catch (error) {
        console.error('Error loading final products:', error)
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadBranches(companyId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {
        console.error('Error loading branches:', error)
        this.formLoading = false
      }
      this.formLoading = false
    },

    onBranchChange() {
      this.warehouses = []

      if (this.formData.branch_id) {
        this.loadWarehouses(this.formData.company_id, this.formData.branch_id)
      }
    },

    async loadWarehouses(companyId, branchId) {
      try {
        this.formLoading = true
        const params = { branch_id: branchId }
        const response = await API.get(`${this.warehouseUrl}/${companyId}`, { params })
        this.warehouses = response.data.data || []
      } catch (error) {
        console.error('Error loading warehouses:', error)
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadContacts(companyId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.contactUrl}/${companyId}`)
        this.contacts = response.data.data || []
      } catch (error) {
        console.error('Error loading contacts:', error)
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadPaymentTypes() {
      try {
        this.formLoading = true
        const response = await API.get(`${this.paymentTypeUrl}`)
        this.paymentTypes = response.data.data || []
      } catch (error) {
        console.error('Error loading payment types:', error)
        this.formLoading = false
      }
      this.formLoading = false
    },
  },
}

export default customFunctions
