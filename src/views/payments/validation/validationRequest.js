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
        this.errors.company_id = this.$t('payments.validation.companyIdRequired')
      }

      if (!form.payment_method_id?.trim()) {
        this.errors.payment_method_id = this.$t('payments.validation.paymentMethodIdRequired')
      }

      if (!form.account_guide_id?.trim()) {
        this.errors.account_guide_id = this.$t('payments.validation.accountGuideIdRequired')
      }

      if (form.amount === null || form.amount === undefined || form.amount === '') {
        this.errors.amount = this.$t('payments.validation.amountRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.payment_method_id?.trim()) {
        this.errors.payment_method_id = this.$t('payments.validation.paymentMethodIdRequired')
      }

      if (form.amount === null || form.amount === undefined || form.amount === '') {
        this.errors.amount = this.$t('payments.validation.amountRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStatusForm(form) {
      this.errors = {}

      if (!form.status_id?.trim()) {
        this.errors.status_id = this.$t('payments.validation.statusIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
