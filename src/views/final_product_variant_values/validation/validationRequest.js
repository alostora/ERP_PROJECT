export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.final_product_id?.trim()) {
        this.errors.final_product_id = this.$t('finalProducts.validation.finalProductIdRequired')
      }

      if (!form.variants?.length) {
        this.errors.final_product_id = this.$t('finalProducts.validation.variantsRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.details?.trim()) {
        this.errors.details = this.$t('finalProducts.validation.detailsRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
