<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('finalProducts.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label">{{ $t('finalProducts.purchasesMeasurementUnit') }}</label>
        <Select
          v-model="formData.purchases_measurement_unit_id"
          :options="measurementUnits"
          :optionLabel="measurementUnitLabel"
          optionValue="id"
          :placeholder="$t('common.all') + ' ' + $t('measurementUnits.title')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.purchases_measurement_unit_id" class="error-message">{{
          errors.purchases_measurement_unit_id
        }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('finalProducts.salesMeasurementUnit') }}</label>
        <Select
          v-model="formData.sales_measurement_unit_id"
          :options="measurementUnits"
          :optionLabel="measurementUnitLabel"
          optionValue="id"
          :placeholder="$t('common.all') + ' ' + $t('measurementUnits.title')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.sales_measurement_unit_id" class="error-message">{{
          errors.sales_measurement_unit_id
        }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('finalProducts.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('finalProducts.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('finalProducts.price') }}</label>
        <input
          v-model="formData.price"
          type="number"
          class="input"
          :class="{ 'input-error': errors.price }"
        />
        <small v-if="errors.price" class="error-message">{{ errors.price }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('finalProducts.details') }}</label>
        <input
          v-model="formData.details"
          type="text"
          class="input"
          :class="{ 'input-error': errors.details }"
        />
        <small v-if="errors.details" class="error-message">{{ errors.details }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('finalProducts.details_ar') }}</label>
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

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select },

  props: {
    selected_item: {
      type: Object,
      default: () => ({}),
    },
    company_id: {
      type: String,
      required: true,
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
      apiUrl: API_ROUTES.FINAL_PRODUCT.BASE,
      formData: {
        id: '',
        purchases_measurement_unit_id: '',
        sales_measurement_unit_id: '',
        name: '',
        name_ar: '',
        price: '',
        details: '',
        details_ar: '',
      },
    }
  },

  mounted() {
    this.loadMeasurementUnits(this.company_id)
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    measurementUnitLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        purchases_measurement_unit_id: selectedItem.purchases_measurement_unit?.id || '',
        sales_measurement_unit_id: selectedItem.sales_measurement_unit?.id || '',
        name: selectedItem.name || '',
        name_ar: selectedItem.name_ar || '',
        price: selectedItem.price || '',
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
