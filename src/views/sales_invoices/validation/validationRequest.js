// src/views/sales_invoices/validation/validationRequest.js

export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('salesInvoices.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('salesInvoices.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('salesInvoices.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('salesInvoices.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t('salesInvoices.validation.duplicateFinalProducts')
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'salesInvoices.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'salesInvoices.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'salesInvoices.validation.quantityRequired'
            )
          }

          // Operations validation - count must not exceed quantity
          if (product.operations?.length && product.quantity) {
            if (product.operations.length > product.quantity) {
              this.errors[`final_products.${index}.operations`] = this.$t(
                'salesInvoices.validation.operationsExceedQuantity',
                { quantity: product.quantity }
              )
            }
          }

          // Validate each operation
          if (product.operations?.length) {
            product.operations.forEach((operation, opIndex) => {
              if (!operation.name?.trim()) {
                this.errors[`final_products.${index}.operations.${opIndex}.name`] = this.$t(
                  'salesInvoices.validation.operationNameRequired'
                )
              }
              if (!operation.price && operation.price !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.price`] = this.$t(
                  'salesInvoices.validation.operationPriceRequired'
                )
              }
              if (!operation.details && operation.details !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.details`] = this.$t(
                  'salesInvoices.validation.operationDetailsRequired'
                )
              }
            })
          }
        })
      }

      // Validate additional costs
      if (form.additional_costs?.length) {
        form.additional_costs.forEach((cost, index) => {
          if (!cost.name?.trim()) {
            this.errors[`additional_costs.${index}.name`] = this.$t(
              'salesInvoices.validation.additionalCostNameRequired'
            )
          }
          if (!cost.value && cost.value !== 0) {
            this.errors[`additional_costs.${index}.value`] = this.$t(
              'salesInvoices.validation.additionalCostValueRequired'
            )
          }
        })
      }

      // Validate additional discounts
      if (form.additional_discounts?.length) {
        form.additional_discounts.forEach((discount, index) => {
          if (!discount.name?.trim()) {
            this.errors[`additional_discounts.${index}.name`] = this.$t(
              'salesInvoices.validation.additionalDiscountNameRequired'
            )
          }
          if (!discount.value && discount.value !== 0) {
            this.errors[`additional_discounts.${index}.value`] = this.$t(
              'salesInvoices.validation.additionalDiscountValueRequired'
            )
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('salesInvoices.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('salesInvoices.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('salesInvoices.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('salesInvoices.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t('salesInvoices.validation.duplicateFinalProducts')
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'salesInvoices.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'salesInvoices.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'salesInvoices.validation.quantityRequired'
            )
          }

          // Operations validation - count must not exceed quantity
          if (product.operations?.length && product.quantity) {
            if (product.operations.length > product.quantity) {
              this.errors[`final_products.${index}.operations`] = this.$t(
                'salesInvoices.validation.operationsExceedQuantity',
                { quantity: product.quantity }
              )
            }
          }

          // Validate each operation
          if (product.operations?.length) {
            product.operations.forEach((operation, opIndex) => {
              if (!operation.name?.trim()) {
                this.errors[`final_products.${index}.operations.${opIndex}.name`] = this.$t(
                  'salesInvoices.validation.operationNameRequired'
                )
              }
              if (!operation.price && operation.price !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.price`] = this.$t(
                  'salesInvoices.validation.operationPriceRequired'
                )
              }
              if (!operation.details && operation.details !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.details`] = this.$t(
                  'salesInvoices.validation.operationDetailsRequired'
                )
              }
            })
          }
        })
      }

      // Validate additional costs
      if (form.additional_costs?.length) {
        form.additional_costs.forEach((cost, index) => {
          if (!cost.name?.trim()) {
            this.errors[`additional_costs.${index}.name`] = this.$t(
              'salesInvoices.validation.additionalCostNameRequired'
            )
          }
          if (!cost.value && cost.value !== 0) {
            this.errors[`additional_costs.${index}.value`] = this.$t(
              'salesInvoices.validation.additionalCostValueRequired'
            )
          }
        })
      }

      // Validate additional discounts
      if (form.additional_discounts?.length) {
        form.additional_discounts.forEach((discount, index) => {
          if (!discount.name?.trim()) {
            this.errors[`additional_discounts.${index}.name`] = this.$t(
              'salesInvoices.validation.additionalDiscountNameRequired'
            )
          }
          if (!discount.value && discount.value !== 0) {
            this.errors[`additional_discounts.${index}.value`] = this.$t(
              'salesInvoices.validation.additionalDiscountValueRequired'
            )
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStageForm(form) {
      this.errors = {}

      // Stage ID required
      if (!form.stage_id?.trim()) {
        this.errors.stage_id = this.$t('salesInvoices.validation.stageIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStageActionForm(form) {
      this.errors = {}

      // Approve must be boolean (true or false)
      if (typeof form.approve !== 'boolean') {
        this.errors.approve = this.$t('salesInvoices.validation.approveMustBeBoolean')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
