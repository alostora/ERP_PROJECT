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
        this.errors.company_id = this.$t('finalProducts.validation.companyIdRequired')
      }

      if (!form.category_id?.trim()) {
        this.errors.category_id = this.$t('finalProducts.validation.categoryIdRequired')
      }

      if (!form.product_id?.trim()) {
        this.errors.product_id = this.$t('finalProducts.validation.productIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('finalProducts.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('finalProducts.validation.nameArRequired')
      }

      if (form.price === null || form.price === undefined || form.price === '') {
        this.errors.price = this.$t('finalProducts.validation.priceRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('finalProducts.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('finalProducts.validation.nameArRequired')
      }

      if (form.price === null || form.price === undefined || form.price === '') {
        this.errors.price = this.$t('finalProducts.validation.priceRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
