export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.final_product_ids.length) {
        this.errors.final_product_ids = this.$t('discounts.validation.finalProductsRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
