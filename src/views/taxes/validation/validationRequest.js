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
        this.errors.company_id = this.$t('taxes.validation.companyIdRequired')
      }

      if (!form.type_id?.trim()) {
        this.errors.type_id = this.$t('taxes.validation.typeIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('taxes.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('taxes.validation.nameArRequired')
      }

      if (form.value === null || form.value === undefined || form.value === '') {
        this.errors.value = this.$t('taxes.validation.valueRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('taxes.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('taxes.validation.nameArRequired')
      }

      if (form.value === null || form.value === undefined || form.value === '') {
        this.errors.value = this.$t('taxes.validation.valueRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
