export default {
  data() {
    return {
      errors: {},
    }
  },

  methods: {
    validateCreateForm(form) {
      this.errors = {}

      // Name
      if (!form.name?.trim()) {
        this.errors.name = this.$t('adjustmentStockingRequests.validation.nameRequired')
      }

      // Type Code
      if (!form.type_code?.trim()) {
        this.errors.type_code = this.$t('adjustmentStockingRequests.validation.typeCodeRequired')
      }

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('adjustmentStockingRequests.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('adjustmentStockingRequests.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('adjustmentStockingRequests.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('adjustmentStockingRequests.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t('adjustmentStockingRequests.validation.duplicateFinalProducts')
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'adjustmentStockingRequests.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'adjustmentStockingRequests.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'adjustmentStockingRequests.validation.quantityRequired'
            )
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      // Name
      if (!form.name?.trim()) {
        this.errors.name = this.$t('adjustmentStockingRequests.validation.nameRequired')
      }

      // Type Code
      if (!form.type_code?.trim()) {
        this.errors.type_code = this.$t('adjustmentStockingRequests.validation.typeCodeRequired')
      }

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('adjustmentStockingRequests.validation.companyIdRequired')
      }

      // Branch ID
      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('adjustmentStockingRequests.validation.branchIdRequired')
      }

      // Warehouse ID
      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('adjustmentStockingRequests.validation.warehouseIdRequired')
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('adjustmentStockingRequests.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t('adjustmentStockingRequests.validation.duplicateFinalProducts')
        }
      }

      // Validate each final product
      if (form.final_products?.length) {
        form.final_products.forEach((product, index) => {
          // Final product ID
          if (!product.final_product_id?.trim()) {
            if (!this.errors[`final_products.${index}.final_product_id`]) {
              this.errors[`final_products.${index}.final_product_id`] = this.$t(
                'adjustmentStockingRequests.validation.finalProductIdRequired'
              )
            }
          }

          // Unit price
          if (!product.unit_price && product.unit_price !== 0) {
            this.errors[`final_products.${index}.unit_price`] = this.$t(
              'adjustmentStockingRequests.validation.unitPriceRequired'
            )
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'adjustmentStockingRequests.validation.quantityRequired'
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
        this.errors.stage_id = this.$t('adjustmentStockingRequests.validation.stageIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStageActionForm(form) {
      this.errors = {}

      // Approve must be boolean (true or false)
      if (typeof form.approve !== 'boolean') {
        this.errors.approve = this.$t('adjustmentStockingRequests.validation.approveMustBeBoolean')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
