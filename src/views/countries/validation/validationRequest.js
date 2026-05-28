export default {
     data() {
          return {
               errors: {}
          }
     },
     methods: {
          validateCreateForm(form) {
               this.errors = {}

               if (!form.name?.trim()) {
                    this.errors.name = this.$t('countries.validation.nameRequired')
               }

               if (!form.name_ar?.trim()) {
                    this.errors.name_ar = this.$t('countries.validation.nameArRequired')
               }

               if (!form.phone_code?.trim()) {
                    this.errors.phone_code = this.$t('countries.validation.phoneCodeRequired')
               }

               if (!form.prefix?.trim()) {
                    this.errors.prefix = this.$t('countries.validation.prefixRequired')
               }

               return Object.keys(this.errors).length === 0
          },

          validateUpdateForm(form) {
               this.errors = {}

               if (!form.name?.trim()) {
                    this.errors.name = this.$t('countries.validation.nameRequired')
               }

               if (!form.name_ar?.trim()) {
                    this.errors.name_ar = this.$t('countries.validation.nameArRequired')
               }

               if (!form.phone_code?.trim()) {
                    this.errors.phone_code = this.$t('countries.validation.phoneCodeRequired')
               }

               if (!form.prefix?.trim()) {
                    this.errors.prefix = this.$t('countries.validation.prefixRequired')
               }

               return Object.keys(this.errors).length === 0
          },
     }
}