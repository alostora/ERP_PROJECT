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

      finalProductUrl: API_ROUTES.PURCHASES_INVOICE.FINAL_PRODUCTS,
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

      invoiceUrl: API_ROUTES.PURCHASES_INVOICE_RETURN.BASE,
      invoice: {},

      parentInvoiceUrl: API_ROUTES.PURCHASES_INVOICE.BASE,
      parentInvoice: {},
    }
  },

  methods: {
    async loadFinalProducts(purchasesInvoiceId) {
      try {
        this.formLoading = true
        const params = this.finalProductFilters
        const response = await API.get(`${this.finalProductUrl}/${purchasesInvoiceId}`, { params })
        const finalProducts = response.data.data || []
        if (finalProducts.length) {
          this.finalProducts = this.performFinalProducts(finalProducts)
        }
      } catch (error) {
        this.formLoading = false
      }
      this.formLoading = false
    },

    performFinalProducts(finalProducts) {
      const final_products = finalProducts.map((invoiceFinalProduct) => {
        return {
          id: invoiceFinalProduct.final_product.id,
          main_image: invoiceFinalProduct.final_product.main_image,
          name: invoiceFinalProduct.final_product.name,
          name_ar: invoiceFinalProduct.final_product.name_ar,
          final_product_variant_values:
            invoiceFinalProduct.final_product.final_product_variant_values,
          //////////////////////////////////////////
          price: invoiceFinalProduct.unit_price_in_main_unit,
          measurement_unit: invoiceFinalProduct.main_measurement_unit,
          measurement_unit_id: invoiceFinalProduct.main_measurement_unit.id,
          quantity: invoiceFinalProduct.remaining_returnable_quantity,
          remaining_returnable_quantity: invoiceFinalProduct.remaining_returnable_quantity,
          operations: invoiceFinalProduct.operations,
          /////////////////////
          purchases_invoice_id: invoiceFinalProduct.purchases_invoice_id,
          purchased_quantity: invoiceFinalProduct.quantity,
          purchased_measurement_unit: invoiceFinalProduct.measurement_unit,
        }
      })

      return final_products
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
        const params = { type_code: LOOKUP_TYPES.LOOKUP_TYPE_CODES.STAGE.INVOICE_PURCHASES_RETURN }
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

    async loadParentInvoice(invoiceId) {
      try {
        this.formLoading = true
        const response = await API.get(`${this.parentInvoiceUrl}/${invoiceId}`)
        this.parentInvoice = response.data?.data || response.data || []
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
