<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('discounts.title') })"
    :modal="true"
    :style="{ width: '700px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <!-- Existing fields -->
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('discounts.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('discounts.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ $t('discounts.date_from') }}</label>
            <input
              v-model="formData.date_from"
              type="datetime-local"
              class="input"
              :class="{ 'input-error': errors.date_from }"
            />
            <small v-if="errors.date_from" class="error-message">{{ errors.date_from }}</small>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ $t('discounts.date_to') }}</label>
            <input
              v-model="formData.date_to"
              type="datetime-local"
              class="input"
              :class="{ 'input-error': errors.date_to }"
            />
            <small v-if="errors.date_to" class="error-message">{{ errors.date_to }}</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ $t('discounts.type') }}</label>
            <Select
              v-model="formData.type_id"
              :options="discountTypes"
              :optionLabel="discountTypeLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('discounts.type')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
            <small v-if="errors.type_id" class="error-message">{{ errors.type_id }}</small>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label class="form-label required">{{ $t('discounts.value') }}</label>
            <input
              v-model="formData.value"
              type="number"
              class="input"
              :class="{ 'input-error': errors.value }"
            />
            <small v-if="errors.value" class="error-message">{{ errors.value }}</small>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('discounts.details') }}</label>

        <textarea v-model="formData.details" class="textarea" rows="3"></textarea>
        <small v-if="errors.details" class="error-message">{{ errors.details }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('discounts.details_ar') }}</label>

        <textarea v-model="formData.details_ar" class="textarea" rows="3"></textarea>
        <small v-if="errors.details_ar" class="error-message">{{ errors.details_ar }}</small>
      </div>

      <!-- Final Products Section -->
      <div class="col-12">
        <div class="form-group">
          <div class="field mb-3">
            <MultiSelect
              v-model="formData.final_product_ids"
              :options="finalProducts"
              optionLabel="name"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('discounts.final_products')"
              :filter="true"
              :showClear="true"
              display="chip"
              class="w-full mb-3"
            />
          </div>
        </div>
      </div>

      <!-- Branches Section -->
      <div class="col-12">
        <div class="form-group">
          <div class="field mb-3">
            <MultiSelect
              v-model="formData.branch_ids"
              :options="branches"
              optionLabel="name"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('discounts.branches')"
              :filter="true"
              :showClear="true"
              display="chip"
              class="w-full mb-3"
            />
          </div>
        </div>
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
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select, MultiSelect },

  props: {
    company_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.DISCOUNT.BASE,
      formData: {
        company_id: '',
        name: '',
        name_ar: '',
        details: '',
        details_ar: '',
        date_from: '',
        date_to: '',
        type_id: '',
        value: '',
        final_product_ids: [],
        branch_ids: [],
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
    discountTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadDiscountTypes()
  },

  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.loadFinalProducts(this.company_id)
      this.loadBranches(this.company_id)
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) return
      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
