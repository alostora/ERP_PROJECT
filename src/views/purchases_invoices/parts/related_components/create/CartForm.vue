<template>
  <div class="card border col-12 col-lg-5">
    <div v-if="formLoading" class="flex-center py-6">
      <div class="card flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
    <form v-else @submit.prevent="emitSubmit">
      <!-- Base Information -->
      <div class="row align-center mb-2 mt-1">
        <div class="col-12">
          <div class="form-group">
            <label class="form-label">{{ $t('purchasesInvoices.base_info') }}</label>
            <div class="border rounded overflow-hidden p-2">
              <!-- Row 1: Name -->
              <div class="row align-center mb-2 mt-1">
                <div class="col-6">
                  <div class="form-group">
                    <Fluid>
                      <FloatLabel variant="on">
                        <InputText
                          id="invoice_name"
                          v-model="localFormData.name"
                          autocomplete="off"
                        />
                        <label for="invoice_name">{{ $t('purchasesInvoices.name') }}</label>
                      </FloatLabel>
                    </Fluid>
                  </div>
                  <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
                </div>
              </div>
              <!-- Row 1: Name -->

              <!-- Row 2: Warehouse & Branch -->
              <div class="row align-center mb-2 mt-1">
                <div class="col-6">
                  <div class="form-group">
                    <Select
                      id="branch_id"
                      v-model="localFormData.branch_id"
                      :options="branches"
                      :optionLabel="branchLabel"
                      optionValue="id"
                      :filter="true"
                      :showClear="true"
                      :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.branch')"
                      :filterPlaceholder="$t('common.search')"
                      class="w-full"
                      @change="onBranchChange"
                    />
                    <small v-if="errors.branch_id" class="error-message"
                      >{{ errors.branch_id }}
                    </small>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <Select
                      id="warehouse_id"
                      v-model="localFormData.warehouse_id"
                      :options="warehouses"
                      :optionLabel="warehouseLabel"
                      optionValue="id"
                      :filter="true"
                      :showClear="true"
                      :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.warehouse')"
                      :filterPlaceholder="$t('common.search')"
                      class="w-full"
                    />
                    <small v-if="errors.warehouse_id" class="error-message">
                      {{ errors.warehouse_id }}</small
                    >
                  </div>
                </div>
              </div>
              <!-- Row 2: Warehouse & Branch -->

              <!-- Row 3: Contact & Payment Type-->
              <div class="row align-center mb-2 mt-1">
                <div class="col-6">
                  <div class="form-group">
                    <Select
                      id="contact_id"
                      v-model="localFormData.contact_id"
                      :options="contacts"
                      optionValue="id"
                      optionLabel="name"
                      :filter="true"
                      :showClear="true"
                      :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.contact')"
                      :filterPlaceholder="$t('common.search')"
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
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <Select
                      id="payment_type_id"
                      v-model="localFormData.payment_type_id"
                      :options="paymentTypes"
                      :optionLabel="paymentTypeLabel"
                      optionValue="id"
                      :filter="true"
                      :showClear="true"
                      :placeholder="
                        $t('common.select') + ' ' + $t('purchasesInvoices.payment_types')
                      "
                      :filterPlaceholder="$t('common.search')"
                      class="w-full"
                    />
                    <small v-if="errors.payment_type_id" class="error-message">
                      {{ errors.payment_type_id }}</small
                    >
                  </div>
                </div>
              </div>
              <!-- Row 3: Contact & Payment Type-->
            </div>
          </div>
        </div>
      </div>
      <!-- Base Information -->

      <!-- Final Products -->
      <div v-if="final_products.length" class="row align-center mb-2 mt-1">
        <div class="col-12">
          <div class="form-group">
            <label class="form-label">{{ $t('purchasesInvoices.final_products') }}</label>
            <div class="border rounded overflow-hidden">
              <div
                v-for="product in final_products"
                :key="product.final_product_id"
                class="p-2 border-bottom"
              >
                <!-- Row 1: Remove -->
                <div class="row align-center mb-4 mt-1">
                  <div class="col-2 text-right">
                    <Button
                      icon="pi pi-times"
                      severity="danger"
                      aria-label="Cancel"
                      @click="deleteProductRow(product)"
                      :title="$t('common.cancel')"
                      size="small"
                    />
                  </div>
                </div>
                <!-- Row 1: Remove -->

                <!-- Row 2: Product Name -->
                <div class="row align-center mb-2 mt-1">
                  <div class="col-12">
                    <Fluid>
                      <FloatLabel variant="on">
                        <InputText
                          id="product_name"
                          v-model="product.name"
                          autocomplete="off"
                          readonly
                        />
                        <label for="product_name">{{ $t('purchasesInvoices.name') }}</label>
                      </FloatLabel>
                    </Fluid>
                  </div>
                </div>
                <!-- Row 2: Product Name -->

                <!-- Row 3: Quantity, Measurement Unit Price -->
                <div class="row align-center mt-3">
                  <div class="col-4">
                    <Fluid>
                      <InputGroup>
                        <InputGroupAddon>
                          <Button
                            icon="pi pi-minus"
                            severity="secondary"
                            text
                            @click="decrementQuantity(product)"
                            :disabled="product.quantity == 1"
                          />
                        </InputGroupAddon>
                        <FloatLabel variant="on">
                          <InputNumber
                            id="quantity"
                            v-model="product.quantity"
                            :min="1"
                            :showButtons="false"
                            class="text-center"
                          />
                          <label for="quantity">{{ $t('purchasesInvoices.quantity') }}</label>
                        </FloatLabel>
                        <InputGroupAddon>
                          <Button
                            icon="pi pi-plus"
                            severity="secondary"
                            text
                            @click="incrementQuantity(product)"
                          />
                        </InputGroupAddon>
                      </InputGroup>
                    </Fluid>
                  </div>
                  <div class="col-5">
                    <Select
                      id="measurement_unit_id"
                      v-model="product.measurement_unit_id"
                      :options="measurementUnits"
                      optionValue="id"
                      :placeholder="$t('purchasesInvoices.measurement_unit')"
                      :filterPlaceholder="$t('common.search')"
                      :filter="true"
                      class="w-full"
                    >
                      <template #option="slotProps">
                        <div class="flex justify-between">
                          <span>{{
                            currentLanguage === 'ar'
                              ? slotProps.option.name_ar
                              : slotProps.option.name
                          }}</span>
                          <span class="text-secondary text-sm"
                            >({{ slotProps.option.factor_value }})</span
                          >
                        </div>
                      </template>
                      <template #value="slotProps">
                        <span v-if="slotProps.value">
                          {{ getMeasurementUnitDisplay(slotProps.value) }}
                        </span>
                        <span v-else>{{ $t('purchasesInvoices.measurement_unit') }}</span>
                      </template>
                    </Select>
                  </div>
                  <div class="col-3">
                    <Fluid>
                      <FloatLabel variant="on">
                        <InputNumber
                          id="unit_price"
                          v-model="product.unit_price"
                          class="text-center w-full"
                          :step="0.01"
                          :min="1"
                        />
                        <label for="unit_price">{{ $t('purchasesInvoices.unit_price') }}</label>
                      </FloatLabel>
                    </Fluid>
                  </div>
                </div>
                <!-- Row 3: Quantity, Measurement Unit Price -->

                <!-- Row 4: Total Price -->
                <div class="border rounded p-2 mt-2 bg-surface-hover">
                  <div class="flex justify-between mb-2">
                    <span class="">{{ $t('purchasesInvoices.total_price') }}:</span>
                    <span class="font-semibold">{{
                      product.quantity *
                      product.unit_price *
                      measurementUnitGroupFactorValue(product.measurement_unit_id)
                    }}</span>
                  </div>
                </div>
                <!-- Row 4: Total Price -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Final Products -->

      <!-- Additional Costs -->
      <div v-if="final_products.length" class="row align-center mb-2 mt-1">
        <div class="col-12">
          <div class="form-group">
            <label class="form-label">{{ $t('purchasesInvoices.additional_costs') }}</label>
            <div class="border rounded overflow-hidden">
              <div class="p-2 border-bottom">
                <!-- Row 1: Append New Cost -->
                <div class="row align-center mb-3 mt-1">
                  <div class="col-2 text-right">
                    <Button
                      icon="pi pi-plus"
                      severity="success"
                      aria-label="addNew"
                      @click="addAdditionalCostRow"
                      :title="$t('common.addNew')"
                      size="small"
                    />
                  </div>
                </div>
                <!-- Row 1: Append New Cost -->

                <!-- Row 1: Name & Value & Delete Button -->
                <div
                  class="row align-center mb-2 mt-1"
                  v-if="localFormData.additional_costs.length"
                  v-for="(cost, index) in localFormData.additional_costs"
                >
                  <div class="col-5">
                    <div class="form-group">
                      <Fluid>
                        <FloatLabel variant="on">
                          <InputText
                            :inputId="'additional_cost_name_' + index"
                            v-model="localFormData.additional_costs[index].name"
                            autocomplete="off"
                          />
                          <label :for="'additional_cost_name_' + index"
                            >{{ $t('purchasesInvoices.name') }}
                          </label>
                        </FloatLabel>
                      </Fluid>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="form-group">
                      <Fluid>
                        <FloatLabel variant="on">
                          <InputNumber
                            id="additional_cost_value"
                            v-model="localFormData.additional_costs[index].value"
                            autocomplete="off"
                          />
                          <label for="additional_cost_value"
                            >{{ $t('purchasesInvoices.value') }}
                          </label>
                        </FloatLabel>
                      </Fluid>
                    </div>
                  </div>
                  <div class="col-2 text-right">
                    <div class="form-group">
                      <Button
                        icon="pi pi-times"
                        severity="danger"
                        aria-label="Cancel"
                        @click="deleteAdditionalCostRow(index)"
                        :title="$t('common.cancel')"
                        size="small"
                      />
                    </div>
                  </div>
                </div>
                <!-- Row 1: Name -->

                <div class="border rounded p-2 bg-surface-hover">
                  <div class="flex justify-between mb-2">
                    <span class="">{{ $t('purchasesInvoices.total_additional_costs') }}:</span>
                    <span class="">{{ formatCurrency(calculateAdditionalCosts()) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Additional Costs -->

      <!-- Additional Discounts -->
      <div v-if="final_products.length" class="row align-center mb-2 mt-1">
        <div class="col-12">
          <div class="form-group">
            <label class="form-label">{{ $t('purchasesInvoices.additional_discounts') }}</label>
            <div class="border rounded overflow-hidden">
              <div class="p-2 border-bottom">
                <!-- Row 1: Append New Cost -->
                <div class="row align-center mb-3 mt-1">
                  <div class="col-2 text-right">
                    <Button
                      icon="pi pi-plus"
                      severity="success"
                      aria-label="addNew"
                      @click="addAdditionalDiscountRow"
                      :title="$t('common.addNew')"
                      size="small"
                    />
                  </div>
                </div>
                <!-- Row 1: Append New Cost -->

                <!-- Row 1: Name & Value & Delete Button -->
                <div
                  class="row align-center mb-2 mt-1"
                  v-if="localFormData.additional_discounts.length"
                  v-for="(discount, index) in localFormData.additional_discounts"
                >
                  <div class="col-5">
                    <div class="form-group">
                      <Fluid>
                        <FloatLabel variant="on">
                          <InputText
                            :inputId="'additional_discount_name_' + index"
                            v-model="localFormData.additional_discounts[index].name"
                            autocomplete="off"
                          />
                          <label :for="'additional_discount_name_' + index"
                            >{{ $t('purchasesInvoices.name') }}
                          </label>
                        </FloatLabel>
                      </Fluid>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="form-group">
                      <Fluid>
                        <FloatLabel variant="on">
                          <InputNumber
                            id="additional_cost_value"
                            v-model="localFormData.additional_discounts[index].value"
                            autocomplete="off"
                          />
                          <label for="additional_cost_value"
                            >{{ $t('purchasesInvoices.value') }}
                          </label>
                        </FloatLabel>
                      </Fluid>
                    </div>
                  </div>
                  <div class="col-2 text-right">
                    <div class="form-group">
                      <Button
                        icon="pi pi-times"
                        severity="danger"
                        aria-label="Cancel"
                        @click="deleteAdditionalDiscountRow(index)"
                        :title="$t('common.cancel')"
                        size="small"
                      />
                    </div>
                  </div>
                </div>
                <!-- Row 1: Name -->

                <div class="border rounded p-2 bg-surface-hover">
                  <div class="flex justify-between mb-2">
                    <span class="">{{ $t('purchasesInvoices.total_additional_discounts') }}:</span>
                    <span class="">{{ formatCurrency(calculateAdditionalDiscounts()) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Additional Discounts -->

      <!-- Total Summary -->
      <div v-if="final_products.length" class="row align-center mb-2 mt-1">
        <div class="col-12">
          <div class="form-group">
            <label class="form-label">{{ $t('purchasesInvoices.total_summary') }}</label>
            <div class="border rounded p-3 bg-surface-hover">
              <div class="flex justify-between mb-2">
                <span class="">{{ $t('purchasesInvoices.subtotal') }}&nbsp;:&nbsp;</span>
                <span class="">{{ formatCurrency(calculateSubtotal()) }}</span>
              </div>

              <div class="flex justify-between mb-2">
                <span class="text-sm"
                  >{{ $t('purchasesInvoices.total_additional_costs') }}&nbsp;:&nbsp;</span
                >
                <span class="text-sm">{{ formatCurrency(this.calculateAdditionalCosts()) }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-sm">
                  {{ $t('purchasesInvoices.total_additional_discounts') }} &nbsp;:&nbsp;
                </span>
                <span class="text-sm">{{
                  formatCurrency(this.calculateAdditionalDiscounts())
                }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t">
                <span class="font-bold"
                  >{{ $t('purchasesInvoices.grand_total') }} &nbsp;:&nbsp;
                </span>
                <span class="font-bold text-primary">
                  {{ formatCurrency(calculateGrandTotal()) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Total Summary -->

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
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import FloatLabel from 'primevue/floatlabel'
import Fluid from 'primevue/fluid'

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
    InputText,
    Button,
    FloatLabel,
    Fluid,
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
        additional_costs: [],
        additional_discounts: [],
      },
      selectedContact: {},
    }
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

    getMeasurementUnitDisplay(measurementUnitId) {
      const unit = this.measurementUnits.find(
        (measurementUnit) => measurementUnit.id === measurementUnitId
      )
      if (!unit) return ''
      const name = this.currentLanguage === 'ar' ? unit.name_ar : unit.name
      return `${name} (${unit.factor_value})`
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
    deleteProductRow(finalProduct) {
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
            summary: this.$t('common.cancel'),
            detail: this.$t('common.cancelled'),
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
      const subTotal = this.final_products.reduce((sum, product) => {
        const factor = this.measurementUnitGroupFactorValue(product.measurement_unit_id)
        return sum + product.quantity * product.unit_price * factor
      }, 0)

      return subTotal
    },

    calculateGrandTotal() {
      return (
        this.calculateSubtotal() +
        this.calculateAdditionalCosts() -
        this.calculateAdditionalDiscounts()
      )
    },

    calculateAdditionalCosts() {
      return this.localFormData.additional_costs.reduce((sum, cost) => {
        return sum + cost.value
      }, 0)
    },

    calculateAdditionalDiscounts() {
      return this.localFormData.additional_discounts.reduce((sum, discount) => {
        return sum + discount.value
      }, 0)
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
