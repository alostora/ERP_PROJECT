<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('purchasesInvoices.title') })"
    modal
    maximizable
    :style="{ width: '80vw', height: '100%' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeFormModal"
  >
    <div class="row">
      <!-- Products Grid -->
      <FinalProduct
        :purchases_invoice_id="purchases_invoice_id"
        :company_id="company_id"
        :final_products="final_products"
        @appendProductToCart="appendProductToCart"
      />
      <!-- End Products Grid -->

      <!-- Cart Form -->
      <CartForm
        :purchases_invoice_return_id="purchases_invoice_return_id"
        :purchases_invoice_id="purchases_invoice_id"
        :company_id="company_id"
        :branch_id="branch_id"
        :final_products.sync="final_products"
        :errors="errors"
        @handelFormData="handelFormData"
        @submit="handleSubmit"
        @closeForm="closeFormModal"
        @deleteFinalProducts="deleteFinalProducts"
        @appendProductToCart="appendProductToCart"
      />
      <!-- End Cart Form -->
    </div>
  </Dialog>
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
import CartForm from './related_components/update/CartForm.vue'
import FinalProduct from './related_components/FinalProduct.vue'

export default {
  name: 'UpdateForm',

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
    '$route.params.purchases_invoice_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.purchases_invoice_id = newVal
        }
      },
      immediate: true,
    },
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
    purchases_invoice_return_id: {
      type: String,
      required: true,
    },
    purchases_invoice_id: {
      type: String,
      required: false,
    },
    company_id: {
      type: String,
      required: true,
    },
    branch_id: {
      type: String,
      required: false,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PURCHASES_INVOICE_RETURN.BASE,
      final_products: [],
      formData: {
        company_id: this.company_id,
        branch_id: this.branch_id,
        final_products: [],
      },
    }
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
        id: cartFormData.id,
        company_id: cartFormData.company_id,
        branch_id: cartFormData.branch_id,
        warehouse_id: cartFormData.warehouse_id,
        contact_id: cartFormData.contact_id,
        payment_type_id: cartFormData.payment_type_id,
        name: cartFormData.name,
        final_products: this.final_products,
        additional_costs: cartFormData.additional_costs,
        additional_discounts: cartFormData.additional_discounts,
      }
    },

    appendProductToCart(finalProducts) {
      this.final_products = finalProducts
    },

    deleteFinalProducts(product) {
      this.final_products = this.final_products.filter(
        (p) => p.final_product_id !== product.final_product_id
      )
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

    closeFormModal() {
      this.formVisible = false
      this.formLoading = false
      this.formErrors = {}
      this.formData = {}
      this.final_products = []
    },
  },
}
</script>
