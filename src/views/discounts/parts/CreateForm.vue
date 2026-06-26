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

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('discounts.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name_ar" v-model="formData.name_ar" autocomplete="on" class="w-full" />
              <label for="name_ar">{{ $t('discounts.name_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <DatePicker
                v-model="formData.date_from"
                inputId="date_from"
                showIcon
                showButtonBar
                iconDisplay="input"
                class="w-full"
              />
              <label for="date_from">{{ $t('discounts.date_from') }}</label>
            </FloatLabel>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <DatePicker
                v-model="formData.date_to"
                inputId="date_to"
                showIcon
                showButtonBar
                iconDisplay="input"
                class="w-full"
              />
              <label for="date_to">{{ $t('discounts.date_to') }}</label>
            </FloatLabel>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <Select
              v-model="formData.type_id"
              :options="discountTypes"
              :optionLabel="discountTypeLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('discounts.type')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('discounts.type')"
              class="w-full"
            />
            <small v-if="errors.type_id" class="error-message">{{ errors.type_id }}</small>
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputNumber id="value" v-model="formData.value" autocomplete="on" class="w-full" />
              <label for="value">{{ $t('discounts.value') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.value" class="error-message">{{ errors.value }}</small>
        </div>
      </div>

      <!-- Final Products Section -->
      <div class="row">
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
      </div>

      <!-- Branches Section -->
      <div class="row">
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
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Textarea
                id="details"
                v-model="formData.details"
                rows="2"
                style="resize: none"
                fluid
              />
              <label for="details">{{ $t('discounts.details') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.details" class="error-message">{{ errors.details }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Textarea
                id="details_ar"
                v-model="formData.details_ar"
                rows="2"
                style="resize: none"
                fluid
              />
              <label for="details_ar">{{ $t('discounts.details_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.details_ar" class="error-message">{{ errors.details_ar }}</small>
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
import DatePicker from 'primevue/datepicker'
import MultiSelect from 'primevue/multiselect'

import { API_ROUTES } from '@/constants/apiRoutes'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, DatePicker, MultiSelect },

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
