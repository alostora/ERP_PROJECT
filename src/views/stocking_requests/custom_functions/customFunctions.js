import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'
import LOOKUP_TYPES from '@/constants/lookupTypes'
import tableMixin from '@/mixins/table'

export const customFunctions = {
  mixins: [tableMixin],
  data() {
    return {
      finalProductFilters: {
        branch_id: '',
        category_id: '',
      },

      branchUrl: API_ROUTES.BRANCH.SEARCH,
      branches: [],

      warehouseUrl: API_ROUTES.WAREHOUSE.SEARCH,
      warehouses: [],

      stageUrl: API_ROUTES.STAGE.SEARCH,
      stages: [],
    }
  },

  methods: {
    async loadBranches(companyId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.branchUrl}/${companyId}`)
        this.branches = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    onBranchChange() {
      const branchId =
        this.formData?.branch_id || this.localFormData?.branch_id || this.filters?.branch_id

      const companyId =
        this.company_id || this.formData?.company_id || this.localFormData?.company_id

      this.filters.warehouse_id = ''
      this.warehouses = []

      if (branchId) {
        this.loadWarehouses(companyId, branchId)
      }
    },

    async loadWarehouses(companyId, branchId) {
      try {
        this.formLoading = true
        const params = { branch_id: branchId }
        const response = await API.get(`${this.warehouseUrl}/${companyId}`, { params })
        this.warehouses = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadStages(companyId) {
      try {
        this.formLoading = true
        const params = { type_code: LOOKUP_TYPES.LOOKUP_TYPE_CODES.STAGE.INVOICE_SALES }
        const response = await API.get(`${this.stageUrl}/${companyId}`, { params })
        this.stages = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },
  },
}

export default customFunctions
