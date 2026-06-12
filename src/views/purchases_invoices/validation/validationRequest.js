// src/views/purchases_invoices/validation/validationRequest.js

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
        this.errors.company_id = this.$t('purchasesInvoices.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('purchasesInvoices.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('purchasesInvoices.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('purchasesInvoices.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t(
            'purchasesInvoices.validation.duplicateFinalProducts'
          )
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'purchasesInvoices.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'purchasesInvoices.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'purchasesInvoices.validation.quantityRequired'
            )
          }

          // Operations validation - count must not exceed quantity
          if (product.operations?.length && product.quantity) {
            if (product.operations.length > product.quantity) {
              this.errors[`final_products.${index}.operations`] = this.$t(
                'purchasesInvoices.validation.operationsExceedQuantity',
                { quantity: product.quantity }
              )
            }
          }

          // Validate each operation
          if (product.operations?.length) {
            product.operations.forEach((operation, opIndex) => {
              if (!operation.name?.trim()) {
                this.errors[`final_products.${index}.operations.${opIndex}.name`] = this.$t(
                  'purchasesInvoices.validation.operationNameRequired'
                )
              }
              if (!operation.price && operation.price !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.price`] = this.$t(
                  'purchasesInvoices.validation.operationPriceRequired'
                )
              }
              if (!operation.details && operation.details !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.details`] = this.$t(
                  'purchasesInvoices.validation.operationDetailsRequired'
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
              'purchasesInvoices.validation.additionalCostNameRequired'
            )
          }
          if (!cost.value && cost.value !== 0) {
            this.errors[`additional_costs.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalCostValueRequired'
            )
          }
        })
      }

      // Validate additional discounts
      if (form.additional_discounts?.length) {
        form.additional_discounts.forEach((discount, index) => {
          if (!discount.name?.trim()) {
            this.errors[`additional_discounts.${index}.name`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountNameRequired'
            )
          }
          if (!discount.value && discount.value !== 0) {
            this.errors[`additional_discounts.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountValueRequired'
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
        this.errors.company_id = this.$t('purchasesInvoices.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('purchasesInvoices.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('purchasesInvoices.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('purchasesInvoices.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t(
            'purchasesInvoices.validation.duplicateFinalProducts'
          )
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'purchasesInvoices.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'purchasesInvoices.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'purchasesInvoices.validation.quantityRequired'
            )
          }

          // Operations validation - count must not exceed quantity
          if (product.operations?.length && product.quantity) {
            if (product.operations.length > product.quantity) {
              this.errors[`final_products.${index}.operations`] = this.$t(
                'purchasesInvoices.validation.operationsExceedQuantity',
                { quantity: product.quantity }
              )
            }
          }

          // Validate each operation
          if (product.operations?.length) {
            product.operations.forEach((operation, opIndex) => {
              if (!operation.name?.trim()) {
                this.errors[`final_products.${index}.operations.${opIndex}.name`] = this.$t(
                  'purchasesInvoices.validation.operationNameRequired'
                )
              }
              if (!operation.price && operation.price !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.price`] = this.$t(
                  'purchasesInvoices.validation.operationPriceRequired'
                )
              }
              if (!operation.details && operation.details !== 0) {
                this.errors[`final_products.${index}.operations.${opIndex}.details`] = this.$t(
                  'purchasesInvoices.validation.operationDetailsRequired'
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
              'purchasesInvoices.validation.additionalCostNameRequired'
            )
          }
          if (!cost.value && cost.value !== 0) {
            this.errors[`additional_costs.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalCostValueRequired'
            )
          }
        })
      }

      // Validate additional discounts
      if (form.additional_discounts?.length) {
        form.additional_discounts.forEach((discount, index) => {
          if (!discount.name?.trim()) {
            this.errors[`additional_discounts.${index}.name`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountNameRequired'
            )
          }
          if (!discount.value && discount.value !== 0) {
            this.errors[`additional_discounts.${index}.value`] = this.$t(
              'purchasesInvoices.validation.additionalDiscountValueRequired'
            )
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
