<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('taxCategories.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('taxCategories.is_active') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_active" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('taxCategories.is_default') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_default" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('taxCategories.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('taxCategories.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('taxCategories.details') }}</label>
        <input
          v-model="formData.details"
          type="text"
          class="input"
          :class="{ 'input-error': errors.details }"
        />
        <small v-if="errors.details" class="error-message">{{ errors.details }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('taxCategories.details_ar') }}</label>
        <input
          v-model="formData.details_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.details_ar }"
        />
        <small v-if="errors.details_ar" class="error-message">{{ errors.details_ar }}</small>
      </div>

      <!-- Multi-Select for Taxes using PrimeVue MultiSelect -->
      <div class="form-group">
        <label class="form-label required">{{ $t('taxCategories.taxes') }}</label>
        <MultiSelect
          v-model="formData.tax_ids"
          :options="taxes"
          display="chip"
          optionLabel="name"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('taxCategories.taxes')"
          :filter="true"
          :maxSelectedLabels="10"
          class="w-full"
        />
        <small v-if="errors.tax_ids" class="error-message">{{ errors.tax_ids }}</small>
        <small v-if="errors['tax_ids.*']" class="error-message">{{ errors['tax_ids.*'] }}</small>
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
import MultiSelect from 'primevue/multiselect'
import ToggleSwitch from 'primevue/toggleswitch'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, MultiSelect, ToggleSwitch },

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
      apiUrl: API_ROUTES.TAX_CATEGORY.BASE,
      taxes: [],
      formData: {
        company_id: '',
        is_active: true,
        is_default: false,
        name: '',
        name_ar: '',
        details: '',
        details_ar: '',
        tax_ids: [],
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    taxLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.type_id = this.type_id
      this.formData.is_active = true
      this.formData.is_default = false
      this.formData.tax_ids = []

      this.loadTaxes(this.company_id)
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
