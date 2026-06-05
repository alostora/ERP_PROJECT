import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'
import tableMixin from '@/mixins/table'

export const customFunctions = {
  mixins: [tableMixin],
  data() {
    return {
      accountGuideTypeUrl: API_ROUTES.LOOKUP.ACCOUNT_GUIDE_TYPES,
      accountGuideNatureTypeUrl: API_ROUTES.LOOKUP.ACCOUNT_GUIDE_NATURE_TYPES,
      accountGuideTypes: [],
      accountGuideNatureTypes: [],
    }
  },
  methods: {
    async loadAccountGuideTypes() {
      try {
        const response = await API.get(`${this.accountGuideTypeUrl}`)
        this.accountGuideTypes = response.data.data || []
      } catch (error) {
        console.error('Error loading account guide types:', error)
      }
    },

    async loadAccountGuideNatureTypes() {
      try {
        const response = await API.get(`${this.accountGuideNatureTypeUrl}`)
        this.accountGuideNatureTypes = response.data.data || []
      } catch (error) {
        console.error('Error loading account guide nature types:', error)
      }
    },
  },
}

export default customFunctions
