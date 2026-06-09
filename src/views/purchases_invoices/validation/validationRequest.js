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
        this.errors.company_id = this.$t('purchasesInvoices.validation.companyIdRequired')
      }

      if (!form.branch_id?.trim()) {
        this.errors.branch_id = this.$t('purchasesInvoices.validation.branchIdRequired')
      }

      if (!form.warehouse_id?.trim()) {
        this.errors.warehouse_id = this.$t('purchasesInvoices.validation.warehouseIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      return Object.keys(this.errors).length === 0
    },
  },
}
