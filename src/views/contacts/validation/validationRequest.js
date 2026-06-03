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
        this.errors.company_id = this.$t('contacts.validation.companyIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('contacts.validation.nameRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('contacts.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('contacts.validation.emailInvalid')
      }

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('contacts.validation.phoneRequired')
      }

      if (!form.address?.trim()) {
        this.errors.address = this.$t('contacts.validation.addressRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('contacts.validation.nameRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('contacts.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('contacts.validation.emailInvalid')
      }

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('contacts.validation.phoneRequired')
      }

      if (!form.address?.trim()) {
        this.errors.address = this.$t('contacts.validation.addressRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },
  },
}
