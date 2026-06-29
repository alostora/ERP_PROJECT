export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.stage_id?.trim()) {
        this.errors.stage_id = this.$t('stage_employees.validation.stageIdRequired')
      }

      if (form.employee_ids.length <= 0) {
        this.errors.employee_ids = this.$t('stage_employees.validation.employeesRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      return Object.keys(this.errors).length === 0
    },
  },
}
