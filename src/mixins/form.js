import API from './api'

export const formMixin = {
  data() {
    return {
      formVisible: false,
      formLoading: false,
      formErrors: {},
      formData: {},
      life: 3000,
    }
  },

  methods: {
    openFormModal(data = null) {
      this.formData = data ? { ...data } : {}
      this.formErrors = {}
      this.formVisible = true
    },

    closeFormModal() {
      this.formVisible = false
      this.formLoading = false
      this.formErrors = {}
      this.formData = {}
    },

    async submitCreateForm(url, data, successMsg, emitData = false) {
      this.formLoading = true

      try {
        // await API.post(url, data)
        const response = await API.post(url, data)

        this.$toast.add({
          severity: 'success',
          summary: this.$t('common.success'),
          detail: successMsg || this.$t('common.createdSuccessfully'),
          life: this.life,
        })

        // Only emit data if requested
        if (emitData) {
          const createdData = response.data?.data || response.data
          this.$emit('created', createdData)
        } else {
          this.$emit('created')
        }

        // this.$emit('created')
        this.closeFormModal()
      } catch (e) {
        this.formErrors = e.response?.data?.errors || {}

        if (!Object.keys(this.formErrors).length) {
          this.$toast.add({
            severity: 'error',
            summary: this.$t('common.error'),
            detail: e.response?.data?.message || this.$t('common.createFailed'),
            life: this.life,
          })
        }
      } finally {
        this.formLoading = false
      }
    },

    async submitUpdateForm(url, id, data, successMsg, emitData = false) {
      this.formLoading = true

      try {
        // await API.patch(`${url}/${id}`, data)
        const response = await API.patch(`${url}/${id}`, data)

        this.$toast.add({
          severity: 'success',
          summary: this.$t('common.success'),
          detail: successMsg || this.$t('common.updatedSuccessfully'),
          life: this.life,
        })

        // Only emit data if requested
        if (emitData) {
          const updatedData = response.data?.data || response.data
          this.$emit('updated', updatedData)
        } else {
          this.$emit('updated')
        }

        // this.$emit('updated')
        this.closeFormModal()
      } catch (e) {
        this.formErrors = e.response?.data?.errors || {}

        if (!Object.keys(this.formErrors).length) {
          this.$toast.add({
            severity: 'error',
            summary: this.$t('common.error'),
            detail: e.response?.data?.message || this.$t('common.updateFailed'),
            life: this.life,
          })
        }
      } finally {
        this.formLoading = false
      }
    },
  },
}

export default formMixin
