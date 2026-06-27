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
        this.errors.company_id = this.$t('paymentEquityItems.validation.companyIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('paymentEquityItems.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('paymentEquityItems.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('paymentEquityItems.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('paymentEquityItems.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
