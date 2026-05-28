<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('countries.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('countries.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('countries.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('countries.phone_code') }}</label>
        <input
          v-model="formData.phone_code"
          type="text"
          class="input"
          :class="{ 'input-error': errors.phone_code }"
        />
        <small v-if="errors.phone_code" class="error-message">{{ errors.phone_code }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('countries.prefix') }}</label>
        <input
          v-model="formData.prefix"
          type="text"
          class="input"
          :class="{ 'input-error': errors.prefix }"
        />
        <small v-if="errors.prefix" class="error-message">{{ errors.prefix }}</small>
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
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog },
  data() {
    return {
      apiUrl: API_ROUTES.COUNTRY.BASE,
      accountTypes: [],
      formData: {
        name: '',
        name_ar: '',
        phone_code: '',
        prefix: '',
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
