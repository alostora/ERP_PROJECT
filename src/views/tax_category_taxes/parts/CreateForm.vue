<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('taxCategoryTaxes.title') })"
    :modal="true"
    :style="{ width: '700px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.tax_category_id" />
        <small v-if="errors.tax_category_id" class="error-message">{{
          errors.tax_category_id
        }}</small>
      </div>

      <!-- Taxes Section -->
      <div class="field mb-3">
        <div class="flex justify-between align-center mb-3">
          <h3 class="text-lg font-semibold m-0">{{ $t('taxCategoryTaxes.tax.taxes') }}</h3>
          <button type="button" class="btn btn-sm mt-2" @click="addTaxRow">
            <i class="pi pi-plus text-success"></i>
          </button>
        </div>

        <!-- Tax Rows -->
        <div v-for="(taxRow, index) in taxRows" :key="index" class="card mb-3 p-3">
          <div class="row">
            <!-- Tax Selection -->
            <div class="col-5">
              <div class="form-group">
                <Select
                  v-model="taxRow.tax_id"
                  :options="availableTaxesForRow(index)"
                  optionLabel="name"
                  optionValue="id"
                  :placeholder="$t('common.select') + ' ' + $t('taxCategoryTaxes.tax.tax')"
                  class="w-full"
                  @change="onTaxChange(index, $event)"
                />
              </div>
            </div>

            <!-- Fixed Amount Override -->
            <div class="col-5">
              <div class="form-group">
                <FloatLabel variant="on">
                  <InputNumber
                    id="fixed_amount_override"
                    v-model="taxRow.fixed_amount_override"
                    autocomplete="on"
                    class="w-full"
                    @input="onFixedAmountChange(index, $event)"
                  />
                  <label for="fixed_amount_override">{{
                    $t('taxCategoryTaxes.fixedAmountOverride')
                  }}</label>
                </FloatLabel>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="col-2">
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-outline btn-icon btn btn-success btn-sm ml-1"
                  @click="addTaxRow"
                >
                  <i class="pi pi-plus text-success"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline btn-icon btn text-danger btn-sm mr-1"
                  @click="removeTaxRow(index)"
                  :disabled="taxRows.length === 1"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Selected tax display -->
          <div v-if="taxRow.tax_id" class="mt-2 text-sm text-secondary">
            {{ $t('taxCategoryTaxes.tax.tax') }}: {{ getSelectedTaxName(taxRow.tax_id) }}
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="taxRows.length === 0" class="card text-center p-6">
          <i class="pi pi-inbox text-3xl text-secondary mb-2"></i>
          <p class="text-secondary mb-3">{{ $t('taxCategoryTaxes.tax.noTaxes') }}</p>
          <button type="button" class="btn btn-outline" @click="addTaxRow">
            <i class="pi pi-plus"></i>
            {{ $t('taxCategoryTaxes.tax.addTax') }}
          </button>
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
    tax_category_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      apiUrl: `${API_ROUTES.TAX_CATEGORY_TAX.ATTACH_TAXES}/${this.tax_category_id}`,
      formData: {
        tax_category_id: '',
        taxes: [],
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
      this.formData.tax_category_id = this.tax_category_id || this.$route.params.tax_category_id
      this.formData.taxes = []
      this.taxRows = [{ tax_id: null, fixed_amount_override: null }]

      const companyId = this.company_id || this.$route.params.company_id

      this.loadTaxes(companyId, this.formData.tax_category_id)
    },

    async handleSubmit() {
      // Format data for backend
      this.formData.taxes = this.taxRows
        .filter((row) => row.tax_id)
        .map((row) => ({
          tax_id: row.tax_id,
          fixed_amount_override: row.fixed_amount_override || null,
        }))

      if (this.formData.taxes.length === 0) {
        this.$toast.add({
          severity: 'error',
          summary: this.$t('common.error'),
          detail: this.$t('taxCategoryTaxes.validation.atLeastOneTax'),
          life: 3000,
        })
        return
      }

      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
