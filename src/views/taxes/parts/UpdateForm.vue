<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('taxes.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
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
          {{ formLoading ? $t('common.loading') : $t('common.update') }}
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
import Select from 'primevue/select'
import ToggleSwitch from 'primevue/toggleswitch'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select, ToggleSwitch },

  props: {
    selected_item: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    selected_item: {
      immediate: true,
      deep: true,
      handler(selectedItem) {
        if (selectedItem && selectedItem.id) {
          this.populateForm(selectedItem)
        }
      },
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.TAX.BASE,
      formData: {
        id: '',
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

  mounted() {
    this.loadTaxTypes()
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    taxTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        type_id: selectedItem.type?.id || '',
        is_active: selectedItem.is_active || '',
        name: selectedItem.name || '',
        name_ar: selectedItem.name_ar || '',
        value: selectedItem.value || '',
        details: selectedItem.details || '',
        details_ar: selectedItem.details_ar || '',
      }
    },

    openModal() {
      this.formVisible = true
    },

    async handleSubmit() {
      if (!this.validateUpdateForm(this.formData)) {
        return
      }

      const data = { ...this.formData }
      delete data.id

      await this.submitUpdateForm(
        this.apiUrl,
        this.formData.id,
        data,
        this.$t('common.updatedSuccessfully')
      )
    },
  },
}
</script>
