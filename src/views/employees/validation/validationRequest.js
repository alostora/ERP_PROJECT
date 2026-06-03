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
        this.errors.company_id = this.$t('employees.validation.companyIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('employees.validation.nameRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('employees.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('employees.validation.emailInvalid')
      }

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('employees.validation.phoneRequired')
      }

      if (!form.password) {
        this.errors.password = this.$t('employees.validation.passwordRequired')
      } else if (form.password.length < 6) {
        this.errors.password = this.$t('employees.validation.passwordMinLength')
      }

      if (!form.password_confirmation) {
        this.errors.password_confirmation = this.$t('employees.validation.confirmPasswordRequired')
      } else if (form.password !== form.password_confirmation) {
        this.errors.password_confirmation = this.$t('employees.validation.passwordsDoNotMatch')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('employees.validation.nameRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('employees.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('employees.validation.emailInvalid')
      }

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('employees.validation.phoneRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },
  },
}
