import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      clientUrl: API_ROUTES.CLIENT.SEARCH,
      lookupUrl: API_ROUTES.LOOKUP.CURRENCIES,
      countryUrl: API_ROUTES.COUNTRY.SEARCH,
      governorateUrl: API_ROUTES.GOVERNORATE.SEARCH,
      cityUrl: API_ROUTES.CITY.SEARCH,
      clients: [],
      currencies: [],
      countries: [],
      governorates: [],
      cities: [],
    }
  },
  methods: {
    async loadClients() {
      try {
        const response = await API.get(`${this.clientUrl}`)
        this.clients = response.data.data || []
      } catch (error) {}
    },

    async loadCurrencies() {
      try {
        const response = await API.get(`${this.lookupUrl}`)
        this.currencies = response.data.data || []
      } catch (error) {}
    },

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

    async loadCities(governorateId) {
      if (!governorateId) {
        this.cities = []
        return
      }

      try {
        const params = { governorate_id: governorateId }
        const response = await API.get(this.cityUrl, { params })
        this.cities = response.data.data || []
      } catch (error) {}
    },
  },
}

export default customFunctions
