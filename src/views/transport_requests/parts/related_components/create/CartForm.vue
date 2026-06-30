<template>
  <div class="card col-12 col-md-12 col-lg-4">
    <div v-if="formLoading" class="flex-center py-6">
      <div class="flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
    <form v-else @submit.prevent="emitSubmit">
      <div class="zoom-out">
        <!-- Base Information -->
        <div class="row mb-3">
          <div class="col-12">
            <div class="card-info">
              <div class="card-header-info">{{ $t('transportRequests.base_info') }}</div>
              <div class="card-body">
                <!-- Row 1: Name & Type Code-->
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <Fluid>
                        <FloatLabel variant="on">
                          <InputText
                            id="invoice_name"
                            v-model="localFormData.name"
                            autocomplete="off"
                            class="w-full"
                          />
                          <label for="invoice_name">
                            {{ $t('transportRequests.name') }}
                          </label>
                        </FloatLabel>
                      </Fluid>
                      <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
                    </div>
                  </div>
                </div>

                <!-- Row 2: Branch -->
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <Select
                        id="from_branch_id"
                        v-model="localFormData.from_branch_id"
                        :options="branches"
                        :optionLabel="branchLabel"
                        optionValue="id"
                        :filter="true"
                        :showClear="true"
                        :placeholder="$t('common.select') + ' ' + $t('transportRequests.branch')"
                        :filterPlaceholder="$t('common.search')"
                        class="w-full"
                        @change="onFromBranchChange"
                      />
                      <small v-if="errors.from_branch_id" class="error-message text-danger"
                        >{{ errors.from_branch_id }}
                      </small>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <Select
                        id="to_branch_id"
                        v-model="localFormData.to_branch_id"
                        :options="branches"
                        :optionLabel="branchLabel"
                        optionValue="id"
                        :filter="true"
                        :showClear="true"
                        :placeholder="$t('common.select') + ' ' + $t('transportRequests.branch')"
                        :filterPlaceholder="$t('common.search')"
                        class="w-full"
                        @change="onToBranchChange"
                      />
                      <small v-if="errors.to_branch_id" class="error-message text-danger"
                        >{{ errors.to_branch_id }}
                      </small>
                    </div>
                  </div>
                </div>

                <!-- Row 3: Warehouse -->
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <Select
                        id="from_warehouse_id"
                        v-model="localFormData.from_warehouse_id"
                        :options="fromWarehouses"
                        :optionLabel="warehouseLabel"
                        optionValue="id"
                        :filter="true"
                        :showClear="true"
                        :placeholder="$t('transportRequests.warehouse')"
                        :filterPlaceholder="$t('common.search')"
                        class="w-full"
                      />
                      <small v-if="errors.from_warehouse_id" class="error-message text-danger">
                        {{ errors.from_warehouse_id }}</small
                      >
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <Select
                        id="to_warehouse_id"
                        v-model="localFormData.to_warehouse_id"
                        :options="toWarehouses"
                        :optionLabel="warehouseLabel"
                        optionValue="id"
                        :filter="true"
                        :showClear="true"
                        :placeholder="$t('transportRequests.warehouse')"
                        :filterPlaceholder="$t('common.search')"
                        class="w-full"
                      />
                      <small v-if="errors.to_warehouse_id" class="error-message text-danger">
                        {{ errors.to_warehouse_id }}</small
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Base Information -->

        <!-- Final Products -->
        <div v-if="final_products.length" class="row">
          <div class="col-12">
            <div class="card-indigo">
              <div class="card-header-indigo">
                {{ $t('transportRequests.final_products') + '( ' + final_products.length + ')' }}
              </div>
              <div class="card-body">
                <div class="row">
                  <ScrollPanel
                    :style="{ width: '100%', height: final_products.length > 3 ? '700px' : 'auto' }"
                    :dt="{
                      bar: {
                        background: 'var(--color-warning)',
                        size: '4px',
                      },
                    }"
                  >
                    <div
                      v-for="(product, index) in final_products"
                      :key="product.final_product_id"
                      class="mb-5 rounded p-5"
                      :class="index % 2 === 0 ? 'card-teal' : 'card-info'"
                    >
                      <!-- Remove Button -->
                      <div class="flex justify-end mb-2">
                        <Button
                          icon="pi pi-times"
                          severity="danger"
                          text
                          rounded
                          @click="deleteProductRow(product)"
                          :title="$t('common.cancel')"
                          size="small"
                        />
                      </div>

                      <!-- Product Name -->
                      <div class="mb-3">
                        <Fluid>
                          <input
                            v-model="product.name"
                            type="text"
                            class="input bg-surface font-semibold"
                            readonly
                          />
                        </Fluid>
                      </div>

                      <!-- Quantity, Measurement Unit, Price -->
                      <div class="row g-2 mb-3">
                        <div class="col-12 mb-3">
                          <Fluid>
                            <InputGroup>
                              <InputGroupAddon>
                                <Button
                                  icon="pi pi-minus"
                                  severity="secondary"
                                  text
                                  @click="decrementQuantity(product)"
                                  :disabled="product.quantity == 1"
                                  size="small"
                                />
                              </InputGroupAddon>
                              <FloatLabel variant="on">
                                <InputNumber
                                  id="quantity"
                                  v-model="product.quantity"
                                  :min="1"
                                  :showButtons="true"
                                  class="text-center w-full"
                                />
                                <label for="quantity">{{ $t('transportRequests.quantity') }}</label>
                              </FloatLabel>
                              <InputGroupAddon>
                                <Button
                                  icon="pi pi-plus"
                                  severity="secondary"
                                  text
                                  @click="incrementQuantity(product)"
                                  size="small"
                                />
                              </InputGroupAddon>
                            </InputGroup>
                          </Fluid>
                          <small
                            v-if="errors[`final_products.${index}.quantity`]"
                            class="error-message"
                          >
                            {{ errors[`final_products.${index}.quantity`] }}
                          </small>
                        </div>
                        <div class="col-6">
                          <Select
                            id="measurement_unit_id"
                            v-model="product.measurement_unit_id"
                            :options="measurementUnits"
                            optionValue="id"
                            :placeholder="$t('transportRequests.measurement_unit')"
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
                                <span class="text-secondary text-xs"
                                  >({{ slotProps.option.factor_value }})</span
                                >
                              </div>
                            </template>
                            <template #value="slotProps">
                              <span v-if="slotProps.value">
                                {{ getMeasurementUnitDisplay(slotProps.value) }}
                              </span>
                              <span v-else>{{ $t('transportRequests.measurement_unit') }}</span>
                            </template>
                          </Select>
                        </div>
                        <div class="col-6">
                          <Fluid>
                            <FloatLabel variant="on">
                              <InputNumber
                                id="unit_price"
                                v-model="product.unit_price"
                                class="text-center w-full"
                                :step="0.01"
                                :min="1"
                                disabled
                              />
                              <label for="unit_price">{{
                                $t('transportRequests.unit_price')
                              }}</label>
                            </FloatLabel>
                          </Fluid>

                          <small
                            v-if="errors[`final_products.${index}.unit_price`]"
                            class="error-message"
                          >
                            {{ errors[`final_products.${index}.unit_price`] }}
                          </small>
                        </div>
                      </div>

                      <!-- Total Price -->
                      <div class="bg-gray-50 border-l-4 border-gray rounded p-2 mb-3">
                        <div class="flex justify-between">
                          <span class="text-warning font-medium text-sm">
                            {{ $t('transportRequests.total_price') }}:
                          </span>
                          <span class="font-semibold text-warning text-sm">
                            {{ formatCurrency(calculateProductTotalPrice(product)) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollPanel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Final Products -->

        <!-- Total Summary -->
        <div v-if="final_products.length" class="row mt-2">
          <div class="col-12">
            <div class="card-info">
              <div class="card-header-info">
                {{ $t('transportRequests.total_summary') }}
              </div>

              <div class="card-body">
                <div class="flex justify-between mb-2">
                  <span class="text-secondary">{{ $t('transportRequests.subtotal') }}:</span>
                  <span class="font-medium">{{ formatCurrency(calculateSubtotal()) }}</span>
                </div>

                <div class="flex justify-between pt-2 border-t border-primary-200">
                  <span class="font-bold text-primary"
                    >{{ $t('transportRequests.grand_total') }}:</span
                  >
                  <span class="font-bold text-primary text-xl">{{
                    formatCurrency(calculateGrandTotal())
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Total Summary -->

        <!-- General Error -->
        <small v-if="errors.final_products" class="error-message">
          {{ errors.final_products }}
        </small>
        <!-- General Error -->

        <div class="flex justify-end gap-2 mt-4">
          <button type="submit" class="btn btn-success ml-1 mr-1" :disabled="formLoading">
            <i class="pi pi-check mr-1"></i>
            {{ formLoading ? $t('common.loading') : $t('common.create') }}
          </button>

          <button type="button" class="btn btn-danger" @click="emitCloseFormModal">
            <i class="pi pi-times mr-1"></i>
            {{ $t('common.cancel') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Select from 'primevue/select'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import FloatLabel from 'primevue/floatlabel'
import Fluid from 'primevue/fluid'
import ScrollPanel from 'primevue/scrollpanel'
import Panel from 'primevue/panel'

import formMixin from '@/mixins/form'
import customFunctions from '../../../custom_functions/customFunctions'

export default {
  name: 'CartForm',

  mixins: [formMixin, customFunctions],

  components: {
    Select,
    ProgressSpinner,
    InputGroup,
    InputGroupAddon,
    InputNumber,
    InputText,
    Button,
    FloatLabel,
    Fluid,
    ScrollPanel,
    Panel,
  },

  emits: ['handelFormData', 'submit', 'deleteFinalProducts', 'closeForm'],

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

    final_products: {
      handler(newVal) {
        if (newVal !== this.localFormData.final_products) {
          this.localFormData.final_products = [...newVal]
        }
      },
      immediate: true,
      deep: true,
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
        from_branch_id: '',
        to_branch_id: '',
        from_warehouse_id: '',
        to_warehouse_id: '',
        name: '',
        final_products: [],
      },
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
  },

  mounted() {
    this.loadBranches(this.localFormData.company_id)

    this.loadMeasurementUnits(this.localFormData.company_id)
  },

  methods: {
    emitSubmit() {
      this.$emit('handelFormData', this.localFormData)
      this.$emit('submit')
    },

    emitCloseFormModal() {
      this.$emit('closeForm')
    },

    getMeasurementUnitDisplay(measurementUnitId) {
      const unit = this.measurementUnits.find(
        (measurementUnit) => measurementUnit.id === measurementUnitId
      )
      if (!unit) return ''
      const name = this.currentLanguage === 'ar' ? unit.name_ar : unit.name
      return `${name} (${unit.factor_value})`
    },

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

    measurementUnitGroupFactorValue(product) {
      const measurementUnit = this.measurementUnits.find(
        (unit) => unit.id === product.measurement_unit_id
      )
      if (measurementUnit) {
        return measurementUnit.factor_value
      }
      return 1
    },

    calculateProductTotalPrice(product) {
      return this.measurementUnitGroupFactorValue(product) * product.quantity * product.unit_price
    },

    calculateSubtotal() {
      const subTotal = this.final_products.reduce((sum, product) => {
        return sum + this.calculateProductTotalPrice(product)
      }, 0)

      return subTotal
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

<style scoped>
.zoom-out {
  transform: scale(0.9);
  transform-origin: top center;
  justify-content: center;
}
</style>
