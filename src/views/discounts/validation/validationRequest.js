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
        this.errors.company_id = this.$t('discounts.validation.companyIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('discounts.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('discounts.validation.nameArRequired')
      }

      if (!form.date_from) {
        this.errors.date_from = this.$t('discounts.validation.dateFromRequired')
      }

      if (!form.date_to) {
        this.errors.date_to = this.$t('discounts.validation.dateToRequired')
      }

      if (!form.type_id) {
        this.errors.type_id = this.$t('discounts.validation.typeIdRequired')
      }

      if (form.value === null || form.value === undefined || form.value === '') {
        this.errors.value = this.$t('discounts.validation.valueRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('discounts.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('discounts.validation.nameArRequired')
      }

      if (!form.date_from) {
        this.errors.date_from = this.$t('discounts.validation.dateFromRequired')
      }

      if (!form.date_to) {
        this.errors.date_to = this.$t('discounts.validation.dateToRequired')
      }

      if (!form.type_id) {
        this.errors.type_id = this.$t('discounts.validation.typeIdRequired')
      }

      if (form.value === null || form.value === undefined || form.value === '') {
        this.errors.value = this.$t('discounts.validation.valueRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
