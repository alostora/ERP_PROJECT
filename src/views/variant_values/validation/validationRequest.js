export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.company_id?.trim()) {
        this.errors.company_id = this.$t('variantValues.validation.companyIdRequired')
      }

      if (!form.variant_id?.trim()) {
        this.errors.variant_id = this.$t('variantValues.validation.variantIdRequired')
      }

      if (!form.value?.trim()) {
        this.errors.value = this.$t('variantValues.validation.valueRequired')
      }

      if (!form.value_ar?.trim()) {
        this.errors.value_ar = this.$t('variantValues.validation.valueArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.value?.trim()) {
        this.errors.value = this.$t('variantValues.validation.valueRequired')
      }

      if (!form.value_ar?.trim()) {
        this.errors.value_ar = this.$t('variantValues.validation.valueArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
