<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('finalProducts.title') })"
    :modal="true"
    :style="{ width: '700px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <Select
              v-model="formData.category_id"
              :options="categories"
              :optionLabel="categoryLabel"
              optionValue="id"
              :placeholder="$t('categories.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="onCategoryChange"
            />
          </div>
          <small v-if="errors.category_id" class="error-message">{{ errors.category_id }}</small>
        </div>

        <div class="col-6">
          <div class="form-group" v-if="formData.category_id">
            <Select
              v-model="formData.product_id"
              :options="products"
              :optionLabel="productLabel"
              optionValue="id"
              :placeholder="$t('products.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.product_id" class="error-message">{{ errors.product_id }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <Select
              v-model="formData.purchases_measurement_unit_id"
              :options="measurementUnits"
              :optionLabel="measurementUnitLabel"
              optionValue="id"
              :placeholder="$t('finalProducts.purchasesMeasurementUnit')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.purchases_measurement_unit_id" class="error-message">
            {{ errors.purchases_measurement_unit_id }}
          </small>
        </div>

        <div class="col-6">
          <div class="form-group">
            <Select
              v-model="formData.sales_measurement_unit_id"
              :options="measurementUnits"
              :optionLabel="measurementUnitLabel"
              optionValue="id"
              :placeholder="$t('finalProducts.salesMeasurementUnit')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.sales_measurement_unit_id" class="error-message">
            {{ errors.sales_measurement_unit_id }}
          </small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('finalProducts.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name_ar" v-model="formData.name_ar" autocomplete="on" class="w-full" />
              <label for="name_ar">{{ $t('finalProducts.name_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputNumber id="price" v-model="formData.price" autocomplete="on" class="w-full" />
              <label for="price">{{ $t('finalProducts.price') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.price" class="error-message">{{ errors.price }}</small>
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
              <label for="details">{{ $t('finalProducts.details') }}</label>
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
              <label for="details_ar">{{ $t('finalProducts.details_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.details_ar" class="error-message">{{ errors.details_ar }}</small>
        </div>
      </div>

      <!-- /////////////////////////////////////////////////////////////////////////////// -->
      <!-- Variants Section -->

      <div class="field mb-3">
        <div class="flex justify-between align-center mb-3">
          <h3 class="text-lg font-semibold m-0">{{ $t('finalProducts.variants') }}</h3>
          <button type="button" class="btn btn-sm mt-2" @click="addVariantRow">
            <i class="pi pi-plus text-success"></i>
          </button>
        </div>

        <!-- Variant Rows -->
        <div v-for="(variantRow, index) in variantRows" :key="index" class="card mb-3 p-3">
          <div class="row">
            <!-- Variant Selection -->
            <div class="col-5">
              <div class="form-group">
                <Select
                  v-model="variantRow.variant_id"
                  :options="availableVariantsForRow(index)"
                  optionLabel="name"
                  optionValue="id"
                  :placeholder="$t('finalProducts.variant')"
                  class="w-full"
                  @change="onVariantChange(index, $event)"
                />
              </div>
            </div>

            <!-- Variant Value Selection -->
            <div class="col-5">
              <div class="form-group">
                <Select
                  v-model="variantRow.variant_value_id"
                  :options="getVariantValues(variantRow.variant_id)"
                  optionLabel="value"
                  optionValue="id"
                  :placeholder="$t('finalProducts.variantValue')"
                  class="w-full"
                  :disabled="!variantRow.variant_id"
                  :loading="formLoading"
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
              {{ $t('finalProducts.variant') }}: {{ getSelectedVariantName(variantRow.variant_id) }}
            </span>
            <span v-if="variantRow.variant_value_id" class="ml-3">
              {{ $t('finalProducts.value') }}:
              {{ getSelectedVariantValueName(variantRow.variant_value_id, variantRow.variant_id) }}
            </span>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="variantRows.length === 0" class="card text-center p-6">
          <i class="pi pi-inbox text-3xl text-secondary mb-2"></i>
          <p class="text-secondary mb-3">{{ $t('finalProducts.noVariants') }}</p>
          <button type="button" class="btn btn-outline" @click="addVariantRow">
            <i class="pi pi-plus"></i>
            {{ $t('finalProducts.addVariant') }}
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

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog },

  props: {
    company_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.FINAL_PRODUCT.BASE,
      formData: {
        company_id: '',
        category_id: '',
        product_id: '',
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

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    categoryLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    productLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    measurementUnitLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadCategories(this.company_id)
    this.loadMeasurementUnits(this.company_id)
    this.loadVariants(this.company_id)
  },

  methods: {
    async onCategoryChange() {
      await this.loadProducts(this.formData.company_id, this.formData.category_id)

      this.formData.product_id = ''
    },

    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
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
