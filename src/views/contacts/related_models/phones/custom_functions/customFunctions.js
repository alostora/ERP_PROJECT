import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'
import tableMixin from '@/mixins/table'

export const customFunctions = {
  mixins: [tableMixin],
  data() {
    return {
      updateUrl: API_ROUTES.CONTACT_PHONE.BASE,
    }
  },
  methods: {
    async setDefaultPhone(contactPhoneId) {
      this.$confirm.require({
        message: this.$t('common.confirmSetDefault'),
        header: this.$t('common.confirmSetDefault'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: this.$t('common.confirmYes'),
        rejectLabel: this.$t('common.confirmNo'),
        accept: async () => {
          this.loading = true
          try {
            await API.patch(`${this.updateUrl}/${contactPhoneId}`, { is_default: true })
            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('common.updatedSuccessfully'),
              life: 3000,
            })
            this.fetchData()
          } catch (error) {
            this.$toast.add({
              severity: 'error',
              summary: this.$t('common.error'),
              detail: error.response?.data?.message || this.$t('common.updateFailed'),
              life: 3000,
            })
          } finally {
            this.loading = false
          }
        },
        reject: () => {
          this.loading = false
        },
      })
    },
  },
}

export default customFunctions
