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
        this.errors.company_id = this.$t('products.validation.companyIdRequired')
      }

      if (!form.category_id?.trim()) {
        this.errors.category_id = this.$t('products.validation.categoryIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('products.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('products.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('products.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('products.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
