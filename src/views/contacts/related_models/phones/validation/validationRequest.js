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

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('contacts.validation.phoneRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.phone?.trim()) {
        this.errors.phone = this.$t('contacts.validation.phoneRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },
  },
}
