import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      countryUrl: API_ROUTES.COUNTRY.SEARCH,
      governorateUrl: API_ROUTES.GOVERNORATE.SEARCH,
      countries: [],
      governorates: [],
    }
  },
  methods: {
    async loadCountries() {
      try {
        const response = await API.get(`${this.countryUrl}`)
        this.countries = response.data.data || []
      } catch (error) {}
    },

    async loadGovernorates(countryId) {
      if (!countryId) {
        this.governorates = []
        return
      }

      try {
        const params = { country_id: countryId }
        const response = await API.get(this.governorateUrl, { params })
        this.governorates = response.data.data || []
      } catch (error) {}
    },
  },
}

export default customFunctions
