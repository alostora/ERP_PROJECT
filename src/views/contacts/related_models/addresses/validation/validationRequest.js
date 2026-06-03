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

      if (!form.address?.trim()) {
        this.errors.address = this.$t('contacts.validation.addressRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

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
