export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.tax_category_id?.trim()) {
        this.errors.tax_category_id = this.$t('taxCategoryTaxes.validation.taxCategoryIdRequired')
      }

      if (!form.taxes?.length) {
        this.errors.taxes = this.$t('taxCategoryTaxes.validation.atLeastOneTax')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (
        form.fixed_amount_override === null ||
        form.fixed_amount_override === undefined ||
        form.fixed_amount_override === ''
      ) {
        this.errors.fixed_amount_override = this.$t('taxes.validation.fixedAmountOverrideRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
