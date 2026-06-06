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
        this.errors.company_id = this.$t('transferMoneys.validation.companyIdRequired')
      }

      if (!form.employee_id?.trim()) {
        this.errors.employee_id = this.$t('transferMoneys.validation.employeeIdRequired')
      }

      if (!form.from_id?.trim()) {
        this.errors.from_id = this.$t('transferMoneys.validation.fromIdRequired')
      }

      if (!form.to_id?.trim()) {
        this.errors.to_id = this.$t('transferMoneys.validation.toIdRequired')
      }

      if (form.amount === null || form.amount === undefined || form.amount === '') {
        this.errors.amount = this.$t('transferMoneys.validation.amountRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.status_id?.trim()) {
        this.errors.status_id = this.$t('transferMoneys.validation.statusIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
