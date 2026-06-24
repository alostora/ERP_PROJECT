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
      fromWarehouses: [],
      toWarehouses: [],

      stageUrl: API_ROUTES.STAGE.SEARCH,
      stages: [],

      measurementUnitUrl: API_ROUTES.MEASUREMENT_UNIT.SEARCH,
      measurementUnits: [],

      transportRequestUrl: API_ROUTES.TRANSPORT_REQUEST.BASE,
      transportRequest: {},

      transportRequestFinalProductUrl: API_ROUTES.TRANSPORT_REQUEST_FINAL_PRODUCT.BASE,
      transportRequestFinalProduct: {},
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

    deleteProductRow(finalProduct) {
      this.$confirm.require({
        message: this.$t('common.confirmDeleteMessage', { itemName: finalProduct.name }),
        header: this.$t('common.confirmDeleteTitle'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: this.$t('common.confirmDeleteYes'),
        rejectLabel: this.$t('common.confirmDeleteNo'),
        accept: () => {
          const productToDelete = this.final_products.find(
            (product) => product.final_product_id === finalProduct.final_product_id
          )

          if (productToDelete) {
            this.deleteAdjustmentRequestFinalProduct(
              productToDelete.transport_request_final_product_id
            )

            this.$emit('deleteFinalProducts', productToDelete)

            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('common.deletedSuccessfully'),
              life: 3000,
            })
          }
        },
        reject: () => {
          this.$toast.add({
            severity: 'info',
            summary: this.$t('common.cancel'),
            detail: this.$t('common.cancelled'),
            life: 3000,
          })
        },
      })
    },

    async deleteAdjustmentRequestFinalProduct(adjustmentRequestFinalProductId) {
      try {
        await API.delete(
          `${this.transportRequestFinalProductUrl}/${adjustmentRequestFinalProductId}`
        )
      } catch (error) {}
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

    onFromBranchChange() {
      const branchId =
        this.formData?.from_branch_id ||
        this.localFormData?.from_branch_id ||
        this.filters?.from_branch_id

      const companyId =
        this.company_id || this.formData?.company_id || this.localFormData?.company_id

      this.fromWarehouses = []

      if (branchId) {
        this.loadWarehouses(companyId, branchId, 'from')
      }
    },

    onToBranchChange() {
      const branchId =
        this.formData?.to_branch_id ||
        this.localFormData?.to_branch_id ||
        this.filters?.to_branch_id

      const companyId =
        this.company_id || this.formData?.company_id || this.localFormData?.company_id

      this.toWarehouses = []

      if (branchId) {
        this.loadWarehouses(companyId, branchId, 'to')
      }
    },

    async loadWarehouses(companyId, branchId, type) {
      try {
        this.formLoading = true
        const params = { branch_id: branchId }
        const response = await API.get(`${this.warehouseUrl}/${companyId}`, { params })
        if (type == 'from') {
          this.fromWarehouses = response.data.data || []
        } else {
          this.toWarehouses = response.data.data || []
        }
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    async loadStages(companyId) {
      try {
        this.formLoading = true
        const params = {
          type_code: LOOKUP_TYPES.LOOKUP_TYPE_CODES.STAGE.TRANSPORT_REQUEST,
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

    async loadTransportRequest(transportRequestId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.transportRequestUrl}/${transportRequestId}`)
        this.transportRequest = response.data?.data || response.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },
  },
}

export default customFunctions
