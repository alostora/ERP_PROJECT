import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      measurementUnitGroupUrl: API_ROUTES.MEASUREMENT_UNIT_GROUP.SEARCH,
      measurementUnitGroups: [],
    }
  },
  methods: {
    async loadMeasurementUnitGroups(companyId) {
      try {
        const response = await API.get(`${this.measurementUnitGroupUrl}/${companyId}`)
        this.measurementUnitGroups = response.data.data || []
      } catch (error) {}
    },
  },
}

export default customFunctions
