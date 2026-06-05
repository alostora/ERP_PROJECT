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
        this.errors.company_id = this.$t('categories.validation.companyIdRequired')
      }

      if (!form.account_guide_type_id?.trim()) {
        this.errors.account_guide_type_id = this.$t(
          'categories.validation.accountGuideTypeIdRequired'
        )
      }

      if (!form.account_nature_type_id?.trim()) {
        this.errors.account_nature_type_id = this.$t(
          'categories.validation.accountNatureTypeIdRequired'
        )
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('categories.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('categories.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('categories.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('categories.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
