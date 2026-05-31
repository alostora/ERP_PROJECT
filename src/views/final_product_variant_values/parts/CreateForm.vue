<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('finalProductVariantValues.title') })"
    :modal="true"
    :style="{ width: '700px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>
      <div class="form-group">
        <input type="hidden" v-model="formData.final_product_id" />
        <small v-if="errors.final_product_id" class="error-message">{{
          errors.final_product_id
        }}</small>
      </div>

      <!-- /////////////////////////////////////////////////////////////////////////////// -->
      <!-- Variants Section -->

      <div class="field mb-3">
        <div class="flex justify-between align-center mb-3">
          <h3 class="text-lg font-semibold m-0">{{ $t('finalProductVariantValues.variants') }}</h3>
          <button type="button" class="btn btn-sm mt-2" @click="addVariantRow">
            <i class="pi pi-plus text-success"></i>
          </button>
        </div>

        <!-- Variant Rows -->
        <div v-for="(variantRow, index) in variantRows" :key="index" class="card mb-3 p-3">
          <div class="row gap-3">
            <!-- Variant Selection -->
            <div class="col-5">
              <div class="form-group">
                <label class="form-label text-sm">{{
                  $t('finalProductVariantValues.variant')
                }}</label>
                <Select
                  v-model="variantRow.variant_id"
                  :options="availableVariantsForRow(index)"
                  optionLabel="name"
                  optionValue="id"
                  :placeholder="$t('common.select')"
                  class="w-full"
                  @change="onVariantChange(index, $event)"
                />
              </div>
            </div>

            <!-- Variant Value Selection -->
            <div class="col-4">
              <div class="form-group">
                <label class="form-label text-sm">{{
                  $t('finalProductVariantValues.variantValue')
                }}</label>
                <Select
                  v-model="variantRow.variant_value_id"
                  :options="getVariantValues(variantRow.variant_id)"
                  optionLabel="value"
                  optionValue="id"
                  :placeholder="$t('common.select')"
                  class="w-full"
                  :disabled="!variantRow.variant_id"
                  :loading="loadingVariantValues"
                  @change="onVariantValueChange(index, $event, variantRow.variant_id)"
                />
              </div>
            </div>

            <!-- Remove Button -->
            <div class="col-2">
              <div class="form-group">
                <button
                  type="button"
                  class="btn btn-outline btn-icon btn btn-success btn-sm ml-1"
                  @click="addVariantRow"
                >
                  <i class="pi pi-plus text-success"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline btn-icon btn text-danger btn-sm mr-1"
                  @click="removeVariantRow(index)"
                  :disabled="variantRows.length === 1"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Selected values display -->
          <div
            v-if="variantRow.variant_id || variantRow.variant_value_id"
            class="mt-2 text-sm text-secondary"
          >
            <span v-if="variantRow.variant_id">
              {{ $t('finalProductVariantValues.variant') }}:
              {{ getSelectedVariantName(variantRow.variant_id) }}
            </span>
            <span v-if="variantRow.variant_value_id" class="ml-3">
              {{ $t('finalProductVariantValues.value') }}:
              {{ getSelectedVariantValueName(variantRow.variant_value_id, variantRow.variant_id) }}
            </span>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="variantRows.length === 0" class="card text-center p-6">
          <i class="pi pi-inbox text-3xl text-secondary mb-2"></i>
          <p class="text-secondary mb-3">{{ $t('finalProductVariantValues.noVariants') }}</p>
          <button type="button" class="btn btn-outline" @click="addVariantRow">
            <i class="pi pi-plus"></i>
            {{ $t('finalProductVariantValues.addVariant') }}
          </button>
        </div>
      </div>

      <!-- Variants Section -->
      <!-- /////////////////////////////////////////////////////////////////////////////// -->

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
    final_product_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.FINAL_PRODUCT_VARIANT_VALUE.BASE,
      formData: {
        final_product_id: '',
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  mounted() {},

  methods: {
    openModal() {
      this.openFormModal()
      this.formData.final_product_id = this.final_product_id || this.$route.params.final_product_id
      const company_id = this.company_id || this.$route.params.company_id
      const final_product_id = this.formData.final_product_id
      this.loadVariants(company_id, final_product_id)
    },

    async handleSubmit() {
      console.log(this.formData)
      if (!this.validateCreateForm(this.formData)) {
        return
      }

      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
