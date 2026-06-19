<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('measurementUnits.title') })"
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
        <label class="form-label required">{{ $t('measurementUnits.group') }}</label>
        <Select
          v-model="formData.measurement_unit_group_id"
          :options="measurementUnitGroups"
          :optionLabel="measurementUnitGroupLabel"
          optionValue="id"
          :placeholder="$t('common.all') + ' ' + $t('measurementUnitGroups.title')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.measurement_unit_group_id" class="error-message">{{
          errors.measurement_unit_group_id
        }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('measurementUnits.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('measurementUnits.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('measurementUnits.symbol') }}</label>
        <input
          v-model="formData.symbol"
          type="text"
          class="input"
          :class="{ 'input-error': errors.symbol }"
        />
        <small v-if="errors.symbol" class="error-message">{{ errors.symbol }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('measurementUnits.factor_value') }}</label>
        <input
          v-model="formData.factor_value"
          type="number"
          class="input"
          :class="{ 'input-error': errors.factor_value }"
        />
        <small v-if="errors.factor_value" class="error-message">{{ errors.factor_value }}</small>
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

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    measurement_unit_group_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.MEASUREMENT_UNIT.BASE,
      formData: {
        company_id: '',
        measurement_unit_group_id: '',
        name: '',
        name_ar: '',
        symbol: '',
        factor_value: '',
      },
    }
  },
  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    measurementUnitGroupLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadMeasurementUnitGroups(this.company_id)
  },

  methods: {
    openModal() {
      this.openFormModal()

      this.formData.company_id = this.company_id || this.$route.params.company_id

      this.formData.measurement_unit_group_id =
        this.measurement_unit_group_id || this.$route.params.measurement_unit_group_id
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
