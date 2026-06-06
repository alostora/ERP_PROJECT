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
        this.errors.company_id = this.$t('cashBoxes.validation.companyIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('cashBoxes.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('cashBoxes.validation.nameArRequired')
      }

      if (!form.owner_name?.trim()) {
        this.errors.owner_name = this.$t('cashBoxes.validation.ownerNameRequired')
      }

      if (
        form.provider_code === null ||
        form.provider_code === undefined ||
        form.provider_code === ''
      ) {
        this.errors.provider_code = this.$t('cashBoxes.validation.providerRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('cashBoxes.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('cashBoxes.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
