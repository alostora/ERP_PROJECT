import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
     data() {
          return {
               countryUrl: API_ROUTES.COUNTRY.SEARCH,
               countries: [],
               params: { paginate: true }
          }
     },
     methods: {

          async loadCountries() {
               try {
                    const response = await API.get(`${this.countryUrl}`, this.params)
                    this.countries = response.data.data || []
               } catch (error) {
                    console.error('Error loading countries:', error)
               }
          },
     }
}

export default customFunctions