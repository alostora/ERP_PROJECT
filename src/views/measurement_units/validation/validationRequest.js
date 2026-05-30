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
        this.errors.company_id = this.$t('measurementUnits.validation.companyIdRequired')
      }

      if (!form.measurement_unit_group_id?.trim()) {
        this.errors.measurement_unit_group_id = this.$t(
          'measurementUnits.validation.measurementUnitGroupIdRequired'
        )
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('measurementUnits.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('measurementUnits.validation.nameArRequired')
      }

      if (
        form.factor_value === null ||
        form.factor_value === undefined ||
        form.factor_value === ''
      ) {
        this.errors.factor_value = this.$t('measurementUnits.validation.factorValueRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('measurementUnits.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('measurementUnits.validation.nameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
