export default {
     data() {
          return {
               errors: {}
          }
     },
     methods: {
          validateCreateForm(form) {
               console.log(form)
               this.errors = {}

               if (!form.client_id?.trim()) {
                    this.errors.client_id = this.$t('companies.validation.clientIdRequired')
               }

               if (!form.currency_id?.trim()) {
                    this.errors.currency_id = this.$t('companies.validation.currencyIdRequired')
               }

               if (!form.country_id?.trim()) {
                    this.errors.country_id = this.$t('companies.validation.countryIdRequired')
               }

               if (!form.governorate_id?.trim()) {
                    this.errors.governorate_id = this.$t('companies.validation.governorateIdRequired')
               }

               if (!form.city_id?.trim()) {
                    this.errors.city_id = this.$t('companies.validation.cityIdRequired')
               }

               if (!form.name?.trim()) {
                    this.errors.name = this.$t('companies.validation.nameRequired')
               }

               if (!form.name_ar?.trim()) {
                    this.errors.name_ar = this.$t('companies.validation.nameArRequired')
               }

               if (!form.phone?.trim()) {
                    this.errors.phone = this.$t('companies.validation.phoneRequired')
               }

               if (!form.email?.trim()) {
                    this.errors.email = this.$t('users.validation.emailRequired')
               } else if (!this.isValidEmail(form.email)) {
                    this.errors.email = this.$t('users.validation.emailInvalid')
               }

               return Object.keys(this.errors).length === 0
          },

          validateUpdateForm(form) {
               this.errors = {}

               if (!form.currency_id?.trim()) {
                    this.errors.currency_id = this.$t('companies.validation.currencyIdRequired')
               }

               if (!form.country_id?.trim()) {
                    this.errors.country_id = this.$t('companies.validation.countryIdRequired')
               }

               if (!form.governorate_id?.trim()) {
                    this.errors.governorate_id = this.$t('companies.validation.governorateIdRequired')
               }

               if (!form.city_id?.trim()) {
                    this.errors.city_id = this.$t('companies.validation.cityIdRequired')
               }

               if (!form.name?.trim()) {
                    this.errors.name = this.$t('companies.validation.nameRequired')
               }

               if (!form.name_ar?.trim()) {
                    this.errors.name_ar = this.$t('companies.validation.nameArRequired')
               }

               if (!form.phone?.trim()) {
                    this.errors.phone = this.$t('companies.validation.phoneRequired')
               }

               if (!form.email?.trim()) {
                    this.errors.email = this.$t('users.validation.emailRequired')
               } else if (!this.isValidEmail(form.email)) {
                    this.errors.email = this.$t('users.validation.emailInvalid')
               }

               return Object.keys(this.errors).length === 0
          },

          isValidEmail(email) {
               const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
               return regex.test(email)
          }
     }
}