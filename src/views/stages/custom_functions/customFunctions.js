import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'
import tableMixin from '@/mixins/table'

export const customFunctions = {
  mixins: [tableMixin],
  data() {
    return {
      stageTypeUrl: API_ROUTES.LOOKUP.STAGE_TYPES,
      stageSetDefaultUrl: API_ROUTES.STAGE.SET_DEFAULT,
      stageSetAffectsStockUrl: API_ROUTES.STAGE.SET_AFFECTS_STOCK,
      stageSetSorttUrl: API_ROUTES.STAGE.SET_SORT,
      stageTypes: [],
      dragIndex: null,
    }
  },
  methods: {
    async loadStageTypes() {
      try {
        const response = await API.get(`${this.stageTypeUrl}`)
        this.stageTypes = response.data.data || []

        if (this.filters) {
          if (this.stageTypes.length > 0 && !this.filters.type_id) {
            this.filters.type_id = this.stageTypes[0].id
            this.fetchData()
          }
        }
      } catch (error) {}
    },

    async setDefaultSage(stageId) {
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
            await API.patch(`${this.stageSetDefaultUrl}/${stageId}`)
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

    async setAffectsStockStage(stageId) {
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
            await API.patch(`${this.stageSetAffectsStockUrl}/${stageId}`)
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

    //////////////////////////////////////////////////////

    dragStart(event, index) {
      this.dragIndex = index
      event.dataTransfer.effectAllowed = 'move'
      event.target.style.opacity = '0.5'
    },

    dragOver(event) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    },

    async drop(event, dropIndex) {
      event.preventDefault()
      event.target.style.opacity = '1'

      if (this.dragIndex === dropIndex) return

      const draggedItem = this.items[this.dragIndex]
      const newPosition = dropIndex + 1

      try {
        await API.patch(`${this.stageSetSorttUrl}/${draggedItem.id}`, {
          new_position: newPosition,
        })
        this.fetchData()
        this.$toast.add({
          severity: 'success',
          summary: this.$t('common.success'),
          detail: this.$t('stages.orderUpdated'),
          life: 3000,
        })
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: this.$t('common.error'),
          detail: error.response?.data?.message || this.$t('common.updateFailed'),
          life: 3000,
        })
        this.fetchData()
      }

      this.dragIndex = null
    },
  },
}

export default customFunctions
