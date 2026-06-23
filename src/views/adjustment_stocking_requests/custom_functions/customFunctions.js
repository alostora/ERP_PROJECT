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

      finalProductUrl: API_ROUTES.FINAL_PRODUCT.SEARCH,
      finalProducts: [],

      branchUrl: API_ROUTES.BRANCH.SEARCH,
      branches: [],

      warehouseUrl: API_ROUTES.WAREHOUSE.SEARCH,
      warehouses: [],

      stageUrl: API_ROUTES.STAGE.SEARCH,
      stages: [],

      measurementUnitUrl: API_ROUTES.MEASUREMENT_UNIT.SEARCH,
      measurementUnits: [],

      adjustmentStockingRequestUrl: API_ROUTES.ADJUSTMENT_STOCKING_REQUEST.BASE,
      adjustmentStockingRequest: {},
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
        this.formLoading = false
      }
      this.formLoading = false
    },

    onBranchChange() {
      const branchId =
        this.formData?.branch_id || this.localFormData?.branch_id || this.filters?.branch_id

      const companyId =
        this.company_id || this.formData?.company_id || this.localFormData?.company_id

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
        const params = {
          type_code: LOOKUP_TYPES.LOOKUP_TYPE_CODES.STAGE.ADJUSTMENT_STOCKING_REQUEST,
        }
        const response = await API.get(`${this.stageUrl}/${companyId}`, { params })
        this.stages = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadMeasurementUnits(companyId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.measurementUnitUrl}/${companyId}`)
        this.measurementUnits = response.data.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadAdjustmentStockingRequest(adjustmentStockingRequestId) {
      try {
        this.formLoading = true
        const response = await API.get(
          `${this.adjustmentStockingRequestUrl}/${adjustmentStockingRequestId}`
        )
        this.adjustmentStockingRequest = response.data?.data || response.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },
  },
}

export default customFunctions
