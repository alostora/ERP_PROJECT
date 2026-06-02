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
        this.errors.company_id = this.$t('users.validation.companyIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('users.validation.nameRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('users.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('users.validation.emailInvalid')
      }

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('users.validation.phoneRequired')
      }

      if (!form.password) {
        this.errors.password = this.$t('users.validation.passwordRequired')
      } else if (form.password.length < 6) {
        this.errors.password = this.$t('users.validation.passwordMinLength')
      }

      if (!form.password_confirmation) {
        this.errors.password_confirmation = this.$t('users.validation.confirmPasswordRequired')
      } else if (form.password !== form.password_confirmation) {
        this.errors.password_confirmation = this.$t('users.validation.passwordsDoNotMatch')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('users.validation.nameRequired')
      }

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('users.validation.phoneRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('users.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('users.validation.emailInvalid')
      }

      return Object.keys(this.errors).length === 0
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },
  },
}
