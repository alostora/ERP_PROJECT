<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('taxes.title') })"
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
        <label class="form-label required">{{ $t('taxes.title') }}</label>
        <Select
          v-model="formData.type_id"
          :options="taxTypes"
          :optionLabel="taxTypeLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('taxes.type')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.type_id" class="error-message">{{ errors.type_id }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('taxes.is_active') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_active" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('taxes.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('taxes.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('taxes.value') }}</label>
        <input
          v-model="formData.value"
          type="number"
          class="input"
          :class="{ 'input-error': errors.value }"
        />
        <small v-if="errors.value" class="error-message">{{ errors.value }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('taxes.details') }}</label>
        <input
          v-model="formData.details"
          type="text"
          class="input"
          :class="{ 'input-error': errors.details }"
        />
        <small v-if="errors.details" class="error-message">{{ errors.details }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('taxes.details_ar') }}</label>
        <input
          v-model="formData.details_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.details_ar }"
        />
        <small v-if="errors.details_ar" class="error-message">{{ errors.details_ar }}</small>
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
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select, ToggleSwitch },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    type_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.TAX.BASE,
      formData: {
        company_id: '',
        type_id: '',
        is_active: '',
        name: '',
        name_ar: '',
        value: '',
        details: '',
        details_ar: '',
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    taxTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadTaxTypes()
  },

  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.type_id = this.type_id
      this.formData.is_active = true // Force set to true
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
