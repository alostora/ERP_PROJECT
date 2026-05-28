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

               if (!form.country_id?.trim()) {
                    this.errors.country_id = this.$t('cities.validation.countryIdRequired')
               }

               if (!form.governorate_id?.trim()) {
                    this.errors.governorate_id = this.$t('cities.validation.governoretaIdRequired')
               }

               if (!form.name?.trim()) {
                    this.errors.name = this.$t('cities.validation.nameRequired')
               }

               if (!form.name_ar?.trim()) {
                    this.errors.name_ar = this.$t('cities.validation.nameArRequired')
               }

               return Object.keys(this.errors).length === 0
          },

          validateUpdateForm(form) {
               this.errors = {}

               if (!form.name?.trim()) {
                    this.errors.name = this.$t('cities.validation.nameRequired')
               }

               if (!form.name_ar?.trim()) {
                    this.errors.name_ar = this.$t('cities.validation.nameArRequired')
               }

               return Object.keys(this.errors).length === 0
          },
     }
}