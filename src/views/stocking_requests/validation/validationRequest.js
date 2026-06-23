export default {
  data() {
    return {
      errors: {},
    }
  },
  methods: {
    validateUpdateStageForm(form) {
      this.errors = {}

      // Stage ID required
      if (!form.stage_id?.trim()) {
        this.errors.stage_id = this.$t('stockingRequests.validation.stageIdRequired')
      }

      return Object.keys(this.errors).length === 0
    },

    validateUpdateStageActionForm(form) {
      this.errors = {}

      // Approve must be boolean (true or false)
      if (typeof form.approve !== 'boolean') {
        this.errors.approve = this.$t('stockingRequests.validation.approveMustBeBoolean')
      }

      return Object.keys(this.errors).length === 0
    },
  },
}
