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
        this.errors.company_id = this.$t('accountGuides.validation.companyIdRequired')
      }

      if (!form.account_guide_type_id?.trim()) {
        this.errors.account_guide_type_id = this.$t(
          'accountGuides.validation.accountGuideTypeIdRequired'
        )
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('accountGuides.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('accountGuides.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('accountGuides.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('accountGuides.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
