export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateCreateForm(form) {
      this.errors = {}

      if (!form.branch_ids.length) {
        this.errors.branch_ids = this.$t('discounts.validation.branchesRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
