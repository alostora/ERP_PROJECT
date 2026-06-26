export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('clients.validation.nameRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('clients.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('clients.validation.emailInvalid')
      }

      if (!form.password) {
        this.errors.password = this.$t('clients.validation.passwordRequired')
      } else if (form.password.length < 6) {
        this.errors.password = this.$t('clients.validation.passwordMinLength')
      }

      if (!form.password_confirmation) {
        this.errors.password_confirmation = this.$t('clients.validation.confirmPasswordRequired')
      } else if (form.password !== form.password_confirmation) {
        this.errors.password_confirmation = this.$t('clients.validation.passwordsDoNotMatch')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('clients.validation.nameRequired')
      }

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('clients.validation.phoneRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('clients.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('clients.validation.emailInvalid')
      }

      return Object.keys(this.errors).length === 0
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },
  },
}
