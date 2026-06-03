export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.contact_id?.trim()) {
        this.errors.contact_id = this.$t('contacts.validation.contactIdRequired')
      }

      if (!form.email?.trim()) {
        this.errors.email = this.$t('contacts.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('contacts.validation.emailInvalid')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.email?.trim()) {
        this.errors.email = this.$t('contacts.validation.emailRequired')
      } else if (!this.isValidEmail(form.email)) {
        this.errors.email = this.$t('contacts.validation.emailInvalid')
      }

      return Object.keys(this.errors).length === 0
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },
  },
}
