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
        this.errors.company_id = this.$t('stages.validation.companyIdRequired')
      }

      if (!form.type_id?.trim()) {
        this.errors.type_id = this.$t('stages.validation.typeIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('stages.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('stages.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('stages.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('stages.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
