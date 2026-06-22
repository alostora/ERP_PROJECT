<template>
  <!-- Operations (Collapsible) -->
  <Panel
    :toggleable="true"
    :collapsed="true"
    class="mb-3"
    style="background-color: var(--color-primary-light)"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-cog text-warning text-sm"></i>
        <span class="font-medium text-warning text-sm">
          {{ $t('invoicePayments.title') }}
        </span>
        <span class="bg-warning-100 text-warning-700 text-xs px-2 py-1 rounded-full">
          ({{ $t('invoicePayments.required_amount') }} {{ amount }})
        </span>
      </div>
    </template>

    <div class="border border-warning-200 rounded p-3">
      <div class="flex justify-end mb-2">
        <Button
          icon="pi pi-plus"
          severity="success"
          text
          rounded
          @click="addInvoicePaymentRow()"
          :title="$t('common.addNew')"
          size="small"
        />
      </div>

      <div
        class="row g-2 mb-2 align-center"
        v-if="localFormData.payments.length"
        v-for="(payment, paymentIndex) in localFormData.payments"
      >
        <div class="col-5">
          <Fluid>
            <FloatLabel variant="on">
              <InputNumber
                :inputId="'amount + paymentIndex'"
                v-model="payment.amount"
                autocomplete="off"
              />
              <label :for="'amount + paymentIndex'">
                {{ $t('invoicePayments.amount') }}
              </label>
            </FloatLabel>
            <small v-if="errors[`payments.${paymentIndex}.amount`]" class="error-message">
              {{ errors[`payments.${paymentIndex}.amount`] }}
            </small>
          </Fluid>
        </div>

        <!-- Payment Method -->
        <div class="col-5">
          <Select
            id="payment_method_id"
            v-model="payment.payment_method_id"
            :options="paymentMethods"
            :optionLabel="paymentLabel"
            optionValue="id"
            :placeholder="$t('invoicePayments.payment_methods')"
            :filter="true"
            :showClear="true"
            class="w-full"
            @change="determineMethod(payment)"
          />
          <small v-if="errors[`payments.${paymentIndex}.payment_method_id`]" class="error-message">
            {{ errors[`payments.${paymentIndex}.payment_method_id`] }}
          </small>
        </div>
        <!-- Payment Method -->

        <div class="col-2 text-right">
          <Button
            icon="pi pi-times"
            severity="danger"
            text
            rounded
            @click="deleteInvoicePaymentRow(paymentIndex)"
            size="small"
          />
        </div>

        <!-- Cash Box -->
        <div class="col-10 mt-1" v-if="payment.cashBoxs.length">
          <Select
            id="cash_box_id"
            v-model="payment.cash_box_id"
            :options="cashBoxs"
            :optionLabel="cashBoxLabel"
            optionValue="id"
            :placeholder="$t('invoicePayments.cash_boxs')"
            :filter="true"
            :showClear="true"
            class="w-full"
          />
          <small v-if="errors[`payments.${paymentIndex}.cash_box_id`]" class="error-message">
            {{ errors[`payments.${paymentIndex}.cash_box_id`] }}
          </small>
        </div>
        <!-- Cash Box -->

        <!-- Bank Account -->
        <div class="col-10 mt-1" v-if="payment.bankAccounts.length">
          <Select
            id="bank_account_id"
            v-model="payment.bank_account_id"
            :options="bankAccounts"
            :optionLabel="bankAccountLabel"
            optionValue="id"
            :placeholder="$t('invoicePayments.bank_accounts')"
            :filter="true"
            :showClear="true"
            class="w-full"
          />
          <small v-if="errors[`payments.${paymentIndex}.bank_account_id`]" class="error-message">
            {{ errors[`payments.${paymentIndex}.bank_account_id`] }}
          </small>
        </div>
        <!-- Bank Account -->

        <!-- Bank Account Check Number -->
        <div
          class="col-10 mt-1"
          v-if="payment.bankAccounts.length && payment.selectedPaymentMethod.prefix === 'CHECK'"
        >
          <Fluid>
            <FloatLabel variant="on">
              <InputText
                :inputId="'check_number + paymentIndex'"
                v-model="payment.check_number"
                autocomplete="off"
              />
              <label :for="'check_number + paymentIndex'">
                {{ $t('invoicePayments.check_number') }}
              </label>
            </FloatLabel>
          </Fluid>
        </div>
        <!-- Bank Account Check Number -->

        <!-- Bank Account Check Due Date -->
        <div
          class="col-10 mt-1"
          v-if="payment.bankAccounts.length && payment.selectedPaymentMethod.prefix === 'CHECK'"
        >
          <Fluid>
            <FloatLabel variant="on">
              <input
                v-model="payment.check_due_date"
                type="date"
                class="input"
                :class="{ 'input-error': errors.check_due_date }"
                :id="'check_due_date + paymentIndex'"
              />
              <label :for="'check_due_date + paymentIndex'" class="form-label required p-5">
                {{ $t('invoicePayments.check_due_date') }}</label
              >
            </FloatLabel>
          </Fluid>
        </div>
        <!-- Bank Account Check Due Date -->

        <!-- Wallet -->
        <div class="col-10 mt-1" v-if="payment.wallets.length">
          <Select
            id="wallet_id"
            v-model="payment.wallet_id"
            :options="bankAccounts"
            :optionLabel="bankAccountLabel"
            optionValue="id"
            :placeholder="$t('invoicePayments.wallets')"
            :filter="true"
            :showClear="true"
            class="w-full"
          />
          <small v-if="errors[`payments.${paymentIndex}.wallet_id`]" class="error-message">
            {{ errors[`payments.${paymentIndex}.wallet_id`] }}
          </small>
        </div>
        <!-- Wallet -->

        <!-- Wallet Mobile Number -->
        <div class="col-10 mt-1" v-if="payment.wallets.length">
          <Fluid>
            <FloatLabel variant="on">
              <InputNumber
                :inputId="'mobile_number + paymentIndex'"
                v-model="payment.mobile_number"
                autocomplete="off"
              />
              <label :for="'mobile_number + paymentIndex'">
                {{ $t('invoicePayments.mobile_number') }}
              </label>
            </FloatLabel>
          </Fluid>
        </div>
        <!-- Wallet Mobile Number -->

        <div class="col-10 mt-2">
          <textarea
            class="textarea"
            rows="3"
            :placeholder="$t('invoicePayments.notes')"
            v-model="payment.notes"
          >
          </textarea>
        </div>
      </div>

      <div class="bg-warning-50 border-l-4 border-warning rounded p-2 mt-3">
        <div class="flex justify-between">
          <span class="text-warning font-medium text-sm">
            {{ $t('invoicePayments.amount') }}:
          </span>
          <span class="font-semibold text-warning text-sm">
            {{ calculatedAmount() }}
          </span>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script>
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Fluid from 'primevue/fluid'
import Panel from 'primevue/panel'
import Select from 'primevue/select'
import { customFunctions } from './custom_functions/customFunctions'

export default {
  name: 'CreateInvoicePaymentsComponent',
  mixins: [customFunctions],

  components: {
    InputNumber,
    InputText,
    Button,
    FloatLabel,
    Fluid,
    Panel,
    Select,
  },

  emits: ['emitPaymentsData'],

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
    amount: {
      handler(newVal) {},
      immediate: true,
    },
    'localFormData.payments': {
      handler(newVal) {
        if (!this.isEmitting) {
          this.isEmitting = true
          this.$emit('emitPaymentsData', newVal)
          this.$nextTick(() => {
            this.isEmitting = false
          })
        }
      },
      immediate: true,
      deep: true,
    },
  },

  props: {
    errors: { type: Object, default: () => ({}) },
    company_id: { type: String, required: true },
    branch_id: { type: String, default: '' },
    amount: { type: Number, default: 0 },
  },

  data() {
    return {
      isEmitting: false,
      localFormData: {
        company_id: this.company_id,
        branch_id: this.branch_id,
        payments: [],
      },
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    paymentLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    cashBoxLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    bankAccountLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadPaymentMethods(this.localFormData.company_id)
  },

  methods: {
    calculatedAmount() {
      return this.localFormData.payments.reduce((sum, payment) => {
        return sum + (Number(payment.amount) || 0) // Add amount to sum
      }, 0)
    },
  },
}
</script>
