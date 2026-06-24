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
        this.errors.name = this.$t('transportRequests.validation.nameRequired')
      }

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('transportRequests.validation.companyIdRequired')
      }

      // From Branch ID
      if (!form.from_branch_id?.trim()) {
        this.errors.from_branch_id = this.$t('transportRequests.validation.fromIdRequired')
      }

      // To Branch ID
      if (!form.to_branch_id?.trim()) {
        this.errors.to_branch_id = this.$t('transportRequests.validation.fromIdRequired')
      }

      // From Warehouse ID
      if (!form.from_warehouse_id?.trim()) {
        this.errors.from_warehouse_id = this.$t('transportRequests.validation.fromIdRequired')
      }

      // To Warehouse ID
      if (!form.to_warehouse_id?.trim()) {
        this.errors.to_warehouse_id = this.$t('transportRequests.validation.toIdRequired')
      }

      if (form.from_warehouse_id == form.to_warehouse_id) {
        this.errors.from_warehouse_id = this.$t(
          'transportRequests.validation.warehousesMustBeDifferent'
        )
        this.errors.to_warehouse_id = this.$t(
          'transportRequests.validation.warehousesMustBeDifferent'
        )
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('transportRequests.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t(
            'transportRequests.validation.duplicateFinalProducts'
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
                'transportRequests.validation.finalProductIdRequired'
              )
            }
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'transportRequests.validation.quantityRequired'
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
        this.errors.name = this.$t('transportRequests.validation.nameRequired')
      }

      // Company ID
      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('transportRequests.validation.companyIdRequired')
      }

      // From Branch ID
      if (!form.from_branch_id?.trim()) {
        this.errors.from_branch_id = this.$t('transportRequests.validation.fromIdRequired')
      }

      // To Branch ID
      if (!form.to_branch_id?.trim()) {
        this.errors.to_branch_id = this.$t('transportRequests.validation.fromIdRequired')
      }

      // From Warehouse ID
      if (!form.from_warehouse_id?.trim()) {
        this.errors.from_warehouse_id = this.$t('transportRequests.validation.fromIdRequired')
      }

      // To Warehouse ID
      if (!form.to_warehouse_id?.trim()) {
        this.errors.to_warehouse_id = this.$t('transportRequests.validation.toIdRequired')
      }

      if (form.from_warehouse_id == form.to_warehouse_id) {
        this.errors.from_warehouse_id = this.$t(
          'transportRequests.validation.warehousesMustBeDifferent'
        )
        this.errors.to_warehouse_id = this.$t(
          'transportRequests.validation.warehousesMustBeDifferent'
        )
      }

      // Final Products
      if (!form.final_products?.length) {
        this.errors.final_products = this.$t('transportRequests.validation.finalProductsRequired')
      }

      // Check for duplicate final products
      if (form.final_products?.length) {
        const ids = form.final_products.map((p) => p.final_product_id)
        const uniqueIds = [...new Set(ids)]
        if (ids.length !== uniqueIds.length) {
          this.errors.final_products = this.$t(
            'transportRequests.validation.duplicateFinalProducts'
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
                'transportRequests.validation.finalProductIdRequired'
              )
            }
          }

          // Quantity
          if (!product.quantity && product.quantity !== 0) {
            this.errors[`final_products.${index}.quantity`] = this.$t(
              'transportRequests.validation.quantityRequired'
            )
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateFromStageForm(form) {
      this.errors = {}

      // Stage ID required
      if (!form.from_warehouse_stage_id?.trim()) {
        this.errors.from_warehouse_stage_id = this.$t(
          'transportRequests.validation.stageIdRequired'
        )
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateFromStageActionForm(form) {
      this.errors = {}

      // Approve must be boolean (true or false)
      if (typeof form.approve !== 'boolean') {
        this.errors.approve = this.$t('transportRequests.validation.approveMustBeBoolean')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateToStageForm(form) {
      this.errors = {}

      // Stage ID required
      if (!form.to_warehouse_stage_id?.trim()) {
        this.errors.to_warehouse_stage_id = this.$t('transportRequests.validation.stageIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateToStageActionForm(form) {
      this.errors = {}

      // Approve must be boolean (true or false)
      if (typeof form.approve !== 'boolean') {
        this.errors.approve = this.$t('transportRequests.validation.approveMustBeBoolean')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
