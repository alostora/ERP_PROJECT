export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.country_id?.trim()) {
        this.errors.country_id = this.$t('governorates.validation.countryIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('governorates.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('governorates.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('governorates.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('governorates.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
