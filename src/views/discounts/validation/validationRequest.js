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

      if (!form.name?.trim()) {
        this.errors.name = this.$t('categories.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('categories.validation.nameArRequired')
      }

      if (!form.date_from) {
        this.errors.date_from = this.$t('categories.validation.dateFromRequired')
      }

      if (!form.date_to) {
        this.errors.date_to = this.$t('categories.validation.dateToRequired')
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

      if (!form.date_from) {
        this.errors.date_from = this.$t('categories.validation.dateFromRequired')
      }

      if (!form.date_to) {
        this.errors.date_to = this.$t('categories.validation.dateToRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
