<template>
  <div class="card border col-12 col-lg-4">
    <div v-if="formLoading" class="flex-center py-6">
      <div class="card flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
    <form v-else @submit.prevent="emitSubmit">
      <div class="form-group">
        <input type="hidden" v-model="localFormData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <!-- Name -->
      <div class="form-group">
        <label class="form-label">{{ $t('purchasesInvoices.name') }}</label>
        <input
          v-model="localFormData.name"
          type="text"
          class="input"
          :placeholder="$t('purchasesInvoices.name')"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>
      <!-- End Name -->

      <!-- Branch -->
      <div class="form-group">
        <label class="form-label required">{{ $t('purchasesInvoices.branches') }}</label>
        <Select
          v-model="localFormData.branch_id"
          :options="branches"
          :optionLabel="branchLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.branch')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
          @change="onBranchChange"
        />
        <small v-if="errors.branch_id" class="error-message">{{ errors.branch_id }}</small>
      </div>
      <!-- End Branch -->

      <!-- Warehouse -->
      <div class="form-group" v-if="localFormData.branch_id">
        <label class="form-label required">{{ $t('purchasesInvoices.warehouses') }}</label>
        <Select
          v-model="localFormData.warehouse_id"
          :options="warehouses"
          :optionLabel="warehouseLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.warehouse')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.warehouse_id" class="error-message">{{ errors.warehouse_id }}</small>
      </div>
      <!-- End Warehouse -->

      <!-- Contact  -->
      <div class="form-group">
        <label class="form-label required">{{ $t('purchasesInvoices.contacts') }}</label>
        <Select
          v-model="localFormData.contact_id"
          :options="contacts"
          optionValue="id"
          optionLabel="name"
          :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.contact')"
          :filter="true"
          :showClear="true"
          class="w-full"
        >
          <template #option="{ option }">
            <div class="flex items-center gap-2">
              <div>{{ option.name + ' - ' + option.phone }}</div>
            </div>
          </template>

          <template #footer>
            <div class="p-2 border-t">
              <button
                type="button"
                class="btn btn-sm btn-outline w-full"
                @click="openAddContactModal"
              >
                <i class="pi pi-plus"></i>
                {{ $t('common.addNew') }}
              </button>
              <button
                v-if="localFormData.contact_id"
                type="button"
                class="btn btn-sm btn-outline w-full"
                @click="openUpdateContactModal"
                :disabled="!localFormData.contact_id"
              >
                <i class="pi pi-pencil"></i>
                {{ $t('common.edit') }}
              </button>
            </div>
          </template>
        </Select>
      </div>
      <!-- End Contact -->

      <!-- Payment Type -->
      <div class="form-group">
        <label class="form-label required">{{ $t('purchasesInvoices.payment_types') }}</label>
        <Select
          v-model="localFormData.payment_type_id"
          :options="paymentTypes"
          :optionLabel="paymentTypeLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.payment_types')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.payment_type_id" class="error-message">{{
          errors.payment_type_id
        }}</small>
      </div>
      <!-- End Payment Type -->

      <!-- Final Products -->
      <div v-if="final_products.length" class="form-group">
        <label class="form-label">{{ $t('purchasesInvoices.final_products') }}</label>
        <div class="border rounded overflow-hidden">
          <div v-for="product in final_products" :key="product.id" class="p-2 border-bottom">
            <!-- Row 1: Product Name & Remove -->
            <div class="row align-center mb-2">
              <div class="col-10">
                <input type="text" :value="product.name" class="input input-sm" readonly />
              </div>
              <div class="col-2 text-right">
                <button
                  type="button"
                  class="btn-icon text-danger btn-sm"
                  @click="deleteProduct(product)"
                  :title="$t('common.delete')"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
            <!-- Row 1: Product Name & Remove -->

            <!-- Row 2: Quantity, Measurement Unit -->
            <div class="row align-center">
              <div class="col-4">
                <InputGroup>
                  <InputGroupAddon>
                    <Button
                      icon="pi pi-minus"
                      severity="secondary"
                      text
                      @click="decrementQuantity(product)"
                      :disabled="product.quantity <= 1"
                    />
                  </InputGroupAddon>
                  <InputNumber
                    v-model="product.quantity"
                    :min="1"
                    :showButtons="false"
                    class="text-center"
                  />
                  <InputGroupAddon>
                    <Button
                      icon="pi pi-plus"
                      severity="secondary"
                      text
                      @click="incrementQuantity(product)"
                    />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div class="col-6">
                <Select
                  v-model="product.measurement_unit_id"
                  :options="measurementUnits"
                  :optionLabel="measurementUnitLabel"
                  optionValue="id"
                  :placeholder="$t('purchasesInvoices.measurement_unit')"
                  class="w-full"
                />
              </div>
            </div>
            <!-- Row 2: Quantity, Measurement Unit -->

            <!-- Row 3: Price -->
            <div class="row align-center mt-2">
              <div class="col-4">
                <input
                  type="number"
                  v-model="product.unit_price"
                  class="input input-sm"
                  :placeholder="$t('purchasesInvoices.unit_price')"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <!-- Row 3: Price -->

            <!-- Row 4: Total Price -->
            <div class="row mt-2">
              <div class="col-12 text-right">
                <span class="text-sm text-secondary"
                  >{{ $t('purchasesInvoices.total_price') }}:
                </span>
                <span class="font-semibold">{{
                  product.quantity *
                  product.unit_price *
                  measurementUnitGroupFactorValue(product.measurement_unit_id)
                }}</span>
              </div>
            </div>
            <!-- Row 4: Total Price -->

            <input type="hidden" v-model="product.id" />
          </div>
        </div>
      </div>

      <!-- Total Summary -->
      <div v-if="final_products.length" class="form-group">
        <div class="border rounded p-3 bg-surface-hover">
          <div class="flex justify-between mb-2">
            <span class="">{{ $t('purchasesInvoices.subtotal') }}:</span>
            <span class="">{{ formatCurrency(calculateSubtotal()) }}</span>
          </div>

          <div class="flex justify-between mb-2">
            <span class="text-sm">{{ $t('purchasesInvoices.total_additional_costs') }}:</span>
            <span class="text-sm">{{ formatCurrency(0) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-sm">{{ $t('purchasesInvoices.total_additional_discounts') }}:</span>
            <span class="text-sm">{{ formatCurrency(0) }}</span>
          </div>
          <div class="flex justify-between pt-2 border-t">
            <span class="font-bold">{{ $t('purchasesInvoices.grand_total') }}:</span>
            <span class="font-bold text-primary">{{ formatCurrency(calculateGrandTotal()) }}</span>
          </div>
        </div>
      </div>
      <!-- Total Summary -->
      <!-- Final Products -->

      <div class="flex justify-end gap-2 mt-4">
        <button type="submit" class="btn btn-success ml-2 mr-2" :disabled="formLoading">
          {{ formLoading ? $t('common.loading') : $t('common.create') }}
        </button>
      </div>
    </form>

    <!-- Contact Create Modal  -->
    <CreateContactForm ref="contactModal" :company_id="company_id" @created="onContactCreated" />
    <UpdateForm
      ref="updateContactModal"
      :selected_item="selectedContact"
      @updated="onContactUpdated"
    />
    <!-- Contact Create Modal -->
  </div>
</template>

<script>
import Select from 'primevue/select'
import ProgressSpinner from 'primevue/progressspinner'
import CreateContactForm from '@/views/contacts/parts/CreateForm.vue'
import UpdateForm from '@/views/contacts/parts/UpdateForm.vue'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import formMixin from '@/mixins/form'
import customFunctions from '../../../custom_functions/customFunctions'
import measurementUnitGroups from '@/i18n/locales/en/measurementUnitGroups'

export default {
  name: 'CartForm',

  mixins: [formMixin, customFunctions],

  components: {
    Select,
    ProgressSpinner,
    CreateContactForm,
    UpdateForm,
    InputGroup,
    InputGroupAddon,
    InputNumber,
    Button,
  },

  emits: ['handelFormData', 'submit', 'deleteFinalProducts'],

  watch: {
    company_id: {
      handler(newVal) {
        this.localFormData.company_id = newVal
      },
      immediate: true,
    },
    branch_id: {
      handler(newVal) {
        this.localFormData.branch_id = newVal

        if (this.localFormData.branch_id) {
          this.loadWarehouses(this.localFormData.company_id, this.localFormData.branch_id)
        }
      },
      immediate: true,
    },
  },

  props: {
    errors: { type: Object, default: () => ({}) },
    final_products: { type: Array, default: () => [] },
    company_id: { type: String, required: true },
    branch_id: { type: String, default: '' },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    branchLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    warehouseLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    paymentTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    measurementUnitLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  data() {
    return {
      localFormData: {
        company_id: this.company_id,
        branch_id: this.branch_id,
        warehouse_id: '',
        contact_id: '',
        payment_type_id: '',
        name: '',
        final_products: [],
      },
      selectedContact: {},
    }
  },

  mounted() {
    this.loadBranches(this.localFormData.company_id)

    this.loadContacts(this.localFormData.company_id)

    this.loadPaymentTypes()

    this.loadMeasurementUnits(this.localFormData.company_id)
  },

  methods: {
    emitSubmit() {
      this.$emit('handelFormData', this.localFormData)
      this.$emit('submit')
    },

    ///////////////////// Contact Methods /////////////////////
    openUpdateContactModal() {
      // Find the selected contact
      this.selectedContact = this.contacts.find((c) => c.id === this.localFormData.contact_id)

      if (this.selectedContact) {
        this.$refs.updateContactModal.openModal()
      }
    },

    onContactUpdated(updatedContact) {
      const index = this.contacts.findIndex((c) => c.id === updatedContact.id)
      if (index !== -1) {
        this.contacts[index] = updatedContact
      }

      this.localFormData.contact_id = updatedContact.id
    },

    openAddContactModal() {
      this.$refs.contactModal.openModal()
    },

    onContactCreated(newContact) {
      if (!newContact || !newContact.id) return

      this.contacts.unshift(newContact)
      this.localFormData.contact_id = newContact.id
    },
    ///////////////////// Contact Methods /////////////////////

    ///////////////////// Final Products Methods /////////////////////
    deleteProduct(finalProduct) {
      this.$confirm.require({
        message: this.$t('common.confirmDeleteMessage', { itemName: finalProduct.name }),
        header: this.$t('common.confirmDeleteTitle'),
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: this.$t('common.confirmDeleteYes'),
        rejectLabel: this.$t('common.confirmDeleteNo'),
        accept: () => {
          const productToDelete = this.final_products.find(
            (product) => product.final_product_id === finalProduct.final_product_id
          )

          if (productToDelete) {
            this.$emit('deleteFinalProducts', productToDelete)

            this.$toast.add({
              severity: 'success',
              summary: this.$t('common.success'),
              detail: this.$t('common.deletedSuccessfully'),
              life: 3000,
            })
          }
        },
        reject: () => {
          this.$toast.add({
            severity: 'info',
            summary: this.$t('common.cancelled'),
            detail: this.$t('common.deleteCancelled'),
            life: 3000,
          })
        },
      })
    },

    incrementQuantity(product) {
      product.quantity = (product.quantity || 1) + 1
    },

    decrementQuantity(product) {
      if (product.quantity > 1) {
        product.quantity -= 1
      }
    },

    measurementUnitGroupFactorValue(measurementUnitId) {
      const measurementUnit = this.measurementUnits.find((unit) => unit.id === measurementUnitId)
      if (measurementUnit) {
        return measurementUnit.factor_value
      }
      return 1
    },

    calculateSubtotal() {
      return this.final_products.reduce((sum, product) => {
        const factor = this.measurementUnitGroupFactorValue(product.measurement_unit_id)
        return sum + product.quantity * product.unit_price * factor
      }, 0)
    },

    calculateGrandTotal() {
      return this.calculateSubtotal()
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat(this.currentLanguage === 'ar' ? 'ar-EG' : 'en-US', {
        style: 'currency',
        currency: 'EGP',
      }).format(amount)
    },
    ///////////////////// Final Products Methods /////////////////////
  },
}
</script>
