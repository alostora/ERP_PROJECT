import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      stageTypeUrl: API_ROUTES.LOOKUP.STAGE_TYPES,
      stageTypes: [],
    }
  },
  methods: {
    async loadStageTypes() {
      try {
        const response = await API.get(`${this.stageTypeUrl}`)
        this.stageTypes = response.data.data || []
      } catch (error) {
        console.error('Error loading stage types:', error)
      }
    },
  },
}

export default customFunctions
