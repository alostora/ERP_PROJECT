<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('contacts.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('contacts.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('contacts.email') }}</label>
        <input
          v-model="formData.email"
          type="email"
          class="input"
          :class="{ 'input-error': errors.email }"
        />
        <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('contacts.phone') }}</label>
        <input v-model="formData.phone" type="text" class="input" />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('contacts.address') }}</label>
        <textarea v-model="formData.address" class="textarea" rows="3"></textarea>
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

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog },

  props: {
    company_id: {
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
      apiUrl: API_ROUTES.CONTACT.BASE,
      formData: {
        company_id: this.company_id,
        name: '',
        email: '',
        phone: '',
        address: '',
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
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) {
        return
      }

      await this.submitCreateForm(
        this.apiUrl,
        this.formData,
        this.$t('common.createdSuccessfully'),
        true
      )
    },
  },
}
</script>
