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

      contactUrl: API_ROUTES.CONTACT.SEARCH,
      contacts: [],

      stageUrl: API_ROUTES.STAGE.SEARCH,
      stages: [],

      paymentTypeUrl: API_ROUTES.LOOKUP.PAYMENT_TYPE,
      paymentTypes: [],

      measurementUnitUrl: API_ROUTES.MEASUREMENT_UNIT.SEARCH,
      measurementUnits: [],

      invoiceUrl: API_ROUTES.SALES_INVOICE.BASE,
      invoice: {},
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

    async loadContacts(companyId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.contactUrl}/${companyId}`)
        this.contacts = response.data.data || []
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

    async loadPaymentTypes() {
      try {
        this.formLoading = true
        const response = await API.get(`${this.paymentTypeUrl}`)
        this.paymentTypes = response.data.data || []
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

    async loadInvoice(invoiceId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.invoiceUrl}/${invoiceId}`)
        this.invoice = response.data?.data || response.data || []
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    //////////////////////Additional Costs & Discounts//////////////////////
    addProductOperationRow(product, productIndex) {
      if (product.quantity > product.operations.length) {
        product.operations.push({
          name: '',
          price: '',
        })
      }
    },

    deleteProductOperationRow(product, operationIndex) {
      product.operations.splice(operationIndex, 1)
    },
    //////////////////////Additional Costs & Discounts//////////////////////
    addAdditionalCostRow() {
      if (this.localFormData.additional_costs.length < 10) {
        this.localFormData.additional_costs.push({
          name: '',
          value: '',
        })
      }
    },

    deleteAdditionalCostRow(index) {
      this.localFormData.additional_costs.splice(index, 1)
    },

    addAdditionalDiscountRow() {
      if (this.localFormData.additional_discounts.length < 10) {
        this.localFormData.additional_discounts.push({
          name: '',
          value: '',
        })
      }
    },

    deleteAdditionalDiscountRow(index) {
      this.localFormData.additional_discounts.splice(index, 1)
    },
  },
}

export default customFunctions
