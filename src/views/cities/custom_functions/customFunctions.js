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
                    const params = { paginate: false }

                    const response = await API.get(`${this.countryUrl}`, params)
                    this.countries = response.data.data || []
               } catch (error) {
                    console.error('Error loading countries:', error)
               }
          },

          async loadGovernorates(countryId) {
               if (!countryId) {
                    this.governorates = []
                    return
               }

               try {
                    const params = { paginate: false, country_id: countryId }
                    const response = await API.get(this.governorateUrl, { params })
                    this.governorates = response.data.data || []
               } catch (error) {
                    console.error('Error loading governorates:', error)
               }
          }
     }
}

export default customFunctions