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
        this.errors.company_id = this.$t('bankAccounts.validation.companyIdRequired')
      }

      if (!form.name?.trim()) {
        this.errors.name = this.$t('bankAccounts.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('bankAccounts.validation.nameArRequired')
      }

      if (!form.bank_name?.trim()) {
        this.errors.bank_accountname = this.$t('bankAccounts.validation.bankNameRequired')
      }

      if (!form.bank_name_ar?.trim()) {
        this.errors.bank_name_ar = this.$t('bankAccounts.validation.bankNameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.name?.trim()) {
        this.errors.name = this.$t('bankAccounts.validation.nameRequired')
      }

      if (!form.name_ar?.trim()) {
        this.errors.name_ar = this.$t('bankAccounts.validation.nameArRequired')
      }

      if (!form.bank_name?.trim()) {
        this.errors.bank_accountname = this.$t('bankAccounts.validation.bankNameRequired')
      }

      if (!form.bank_name_ar?.trim()) {
        this.errors.bank_name_ar = this.$t('bankAccounts.validation.bankNameArRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
