import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
     data() {
          return {
               countryUrl: API_ROUTES.COUNTRY.SEARCH,
               countries: [],
          }
     },
     methods: {

          async loadCountries() {
               try {
                    const response = await API.get(`${this.countryUrl}`)
                    this.countries = response.data.data || []
               } catch (error) {
                    console.error('Error loading countries:', error)
               }
          },
     }
}

export default customFunctions