<template>
  <div class="page">
    <Dialog
      v-model:visible="formVisible"
      :header="$t('common.createTitle', { module: $t('purchasesInvoices.title') })"
      modal
      maximizable
      class="card"
      :style="{ width: '80vw', minWidth: '800px' }"
      @hide="closeFormModal"
    >
      <div class="card">
        <div class="p-5">
          <div class="row">
            <!-- Products Grid -->
            <FinalProduct :company_id="company_id" :branches="branches" />
            <!-- End Products Grid -->

            <!-- Cart Form -->
            <CartForm
              :company_id="company_id"
              :branches="branches"
              :errors="errors"
              @handelFormData="handelFormData"
              @submit="handleSubmit"
            />
            <!-- End Cart Form -->
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="btn btn-outline" @click="closeFormModal">
          {{ $t('common.cancel') }}
        </button>
        <button type="submit" class="btn btn-primary ml-2 mr-2" :disabled="formLoading">
          {{ formLoading ? $t('common.loading') : $t('common.create') }}
        </button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { API_ROUTES } from '@/constants/apiRoutes'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import validationRequest from '../validation/validationRequest'

import Dialog from 'primevue/dialog'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Select from 'primevue/select'
import CreateContactForm from '@/views/contacts/parts/CreateForm.vue'
import UpdateForm from '@/views/contacts/parts/UpdateForm.vue'
import CartForm from './related_components/create/CartForm.vue'
import FinalProduct from './related_components/create/FinalProduct.vue'

export default {
  name: 'CreateForm',

  mixins: [formMixin, customFunctions, validationRequest],

  components: {
    Dialog,
    Tag,
    Button,
    Select,
    CreateContactForm,
    UpdateForm,
    CartForm,
    FinalProduct,
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.company_id = newVal
        }
      },
      immediate: true,
    },

    '$route.params.branch_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.branch_id = newVal
        }
      },
      immediate: true,
    },
  },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    branch_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PURCHASES_INVOICE.BASE,
      formData: {
        company_id: this.company_id,
        branch_id: this.branch_id,
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

      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id
    },

    handelFormData(cartFormData) {
      this.formData = {
        ...this.formData,
        company_id: cartFormData.company_id,
        branch_id: cartFormData.branch_id,
        warehouse_id: cartFormData.warehouse_id,
        contact_id: cartFormData.contact_id,
        payment_type_id: cartFormData.payment_type_id,
        name: cartFormData.name,
      }
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
