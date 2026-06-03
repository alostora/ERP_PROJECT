<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('contacts.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('contacts.is_default') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_default" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('contacts.phone') }}</label>
        <input v-model="formData.phone" type="text" class="input" />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="btn btn-outline ml-2 mr-2" @click="closeFormModal">
          {{ $t('common.cancel') }}
        </button>
        <button type="submit" class="btn btn-primary" :disabled="formLoading">
          {{ formLoading ? $t('common.loading') : $t('common.create') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'
import ToggleSwitch from 'primevue/toggleswitch'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, ToggleSwitch },

  props: {
    company_id: {
      type: String,
      required: false,
    },
    contact_id: {
      type: String,
      required: false,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },
  data() {
    return {
      apiUrl: API_ROUTES.CONTACT_PHONE.BASE,
      formData: {
        company_id: this.company_id,
        contact_id: this.contact_id,
        phone: '',
        is_default: '',
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.contact_id = this.contact_id || this.$route.params.contact_id
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) {
        return
      }

      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
