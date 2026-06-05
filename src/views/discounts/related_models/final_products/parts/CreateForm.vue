<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('discounts.createFinalProducts', { module: $t('discounts.title') })"
    :modal="true"
    :style="{ width: '700px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <!-- Existing fields -->
      <div class="form-group">
        <input type="hidden" v-model="formData.discount_id" />
        <small v-if="errors.discount_id" class="error-message">{{ errors.discount_id }}</small>
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
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, MultiSelect },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    discount_id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.DISCOUNT_FINAL_PRODUCT.BASE,
      formData: {
        company_id: this.company_id,
        discount_id: this.discount_id,
        final_product_ids: [],
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
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.discount_id = this.discount_id || this.$route.params.discount_id
      this.loadFinalProducts(this.company_id, this.formData.discount_id)
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) return
      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
