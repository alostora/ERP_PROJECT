import API from '@/mixins/api'
import { API_ROUTES } from '@/constants/apiRoutes'

export const customFunctions = {
  data() {
    return {
      categoryUrl: API_ROUTES.CATEGORY.SEARCH,
      categories: [],
    }
  },
  methods: {
    async loadCategories(companyId) {
      try {
        const response = await API.get(`${this.categoryUrl}/${companyId}`)
        this.categories = response.data.data || []
      } catch (error) {}
    },
  },
}

export default customFunctions
