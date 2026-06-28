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
        this.errors.company_id = this.$t('payments.validation.companyIdRequired')
      }

      if (!form.payment_method_id?.trim()) {
        this.errors.payment_method_id = this.$t('payments.validation.paymentMethodIdRequired')
      }

      if (!form.account_guide_id?.trim()) {
        this.errors.account_guide_id = this.$t('payments.validation.accountGuideIdRequired')
      }

      if (form.amount === null || form.amount === undefined || form.amount === '') {
        this.errors.amount = this.$t('payments.validation.amountRequired')
      }

      // Validate payment iem rows
      if (form.paymentIemRows?.length) {
        form.paymentIemRows.forEach((paymentIem, index) => {
          if (!paymentIem.id?.trim()) {
            this.errors[`paymentIemRows.${index}.id`] = this.$t(
              'payments.validation.paymentIemIdRequired'
            )
          }
          if (
            !paymentIem.unit_price === null ||
            form.unit_price === undefined ||
            form.unit_price === ''
          ) {
            this.errors[`paymentIemRows.${index}.unit_price`] = this.$t(
              'payments.validation.paymentIemUnitPriceRequired'
            )
          }
          if (
            !paymentIem.quantity === null ||
            form.quantity === undefined ||
            form.quantity === ''
          ) {
            this.errors[`paymentIemRows.${index}.quantity`] = this.$t(
              'payments.validation.paymentIemQuantityRequired'
            )
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateForm(form) {
      this.errors = {}

      if (!form.payment_method_id?.trim()) {
        this.errors.payment_method_id = this.$t('payments.validation.paymentMethodIdRequired')
      }

      if (form.amount === null || form.amount === undefined || form.amount === '') {
        this.errors.amount = this.$t('payments.validation.amountRequired')
      }

      // Validate payment iem rows
      if (form.paymentIemRows?.length) {
        form.paymentIemRows.forEach((paymentIem, index) => {
          if (!paymentIem.id?.trim()) {
            this.errors[`paymentIemRows.${index}.id`] = this.$t(
              'payments.validation.paymentIemIdRequired'
            )
          }
          if (
            !paymentIem.unit_price === null ||
            form.unit_price === undefined ||
            form.unit_price === ''
          ) {
            this.errors[`paymentIemRows.${index}.unit_price`] = this.$t(
              'payments.validation.paymentIemUnitPriceRequired'
            )
          }
          if (
            !paymentIem.quantity === null ||
            form.quantity === undefined ||
            form.quantity === ''
          ) {
            this.errors[`paymentIemRows.${index}.quantity`] = this.$t(
              'payments.validation.paymentIemQuantityRequired'
            )
          }
        })
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStatusForm(form) {
      this.errors = {}

      if (!form.status_id?.trim()) {
        this.errors.status_id = this.$t('payments.validation.statusIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
