<template>
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
          @click="addInvoicePaymentRow"
          :title="$t('common.addNew')"
          size="small"
        />
      </div>

      <div v-if="localPayments.length">
        <div
          class="row g-2 mb-2 align-center"
          v-for="(payment, index) in localPayments"
          :key="index"
        >
          <!-- Amount -->
          <div class="col-5">
            <Fluid>
              <FloatLabel variant="on">
                <InputNumber :id="'amount_' + index" v-model="payment.amount" autocomplete="off" />
                <label :for="'amount_' + index">
                  {{ $t('invoicePayments.amount') }}
                </label>
              </FloatLabel>
              <small v-if="errors.amount" class="error-message">
                {{ errors.amount }}
              </small>
            </Fluid>
          </div>

          <!-- Payment Method -->
          <div class="col-5">
            <Select
              v-model="payment.payment_method_id"
              :options="paymentMethods"
              :optionLabel="paymentLabel"
              optionValue="id"
              :placeholder="$t('invoicePayments.payment_methods')"
              filter
              showClear
              class="w-full"
              @change="determineMethod(payment)"
            />
            <small v-if="errors.payment_method_id" class="error-message">
              {{ errors.payment_method_id }}
            </small>
          </div>

          <!-- Delete -->
          <div class="col-2 text-right">
            <Button
              icon="pi pi-times"
              severity="danger"
              text
              rounded
              @click="deleteInvoicePaymentRow(index)"
              size="small"
            />
          </div>

          <!-- Cash Box -->
          <div v-if="payment.cashBoxs && payment.cashBoxs.length" class="col-10 mt-1">
            <Select
              :key="'cash_' + index + '_' + payment.cashBoxs.length"
              v-model="payment.cash_box_id"
              :options="payment.cashBoxs"
              :optionLabel="cashBoxLabel"
              optionValue="id"
              :placeholder="$t('invoicePayments.cash_boxs')"
              filter
              showClear
              class="w-full"
            />
            <small v-if="errors.cash_box_id" class="error-message">
              {{ errors.cash_box_id }}
            </small>
          </div>

          <!-- Bank Account -->
          <div v-if="payment.bankAccounts && payment.bankAccounts.length" class="col-10 mt-1">
            <Select
              :key="'bank_' + index + '_' + payment.bankAccounts.length"
              v-model="payment.bank_account_id"
              :options="payment.bankAccounts"
              :optionLabel="bankAccountLabel"
              optionValue="id"
              :placeholder="$t('invoicePayments.bank_accounts')"
              filter
              showClear
              class="w-full"
            />
            <small v-if="errors.bank_account_id" class="error-message">
              {{ errors.bank_account_id }}
            </small>
          </div>

          <!-- Check fields (only when method is CHECK) -->
          <template
            v-if="payment.selectedPaymentMethod && payment.selectedPaymentMethod.prefix === 'CHECK'"
          >
            <div class="col-10 mt-1">
              <Fluid>
                <FloatLabel variant="on">
                  <InputNumber
                    :id="'check_number_' + index"
                    v-model="payment.check_number"
                    autocomplete="off"
                  />
                  <label :for="'check_number_' + index">
                    {{ $t('invoicePayments.check_number') }}
                  </label>
                </FloatLabel>
                <small v-if="errors.check_number" class="error-message">
                  {{ errors.check_number }}
                </small>
              </Fluid>
            </div>

            <div class="col-10 mt-1">
              <Fluid>
                <FloatLabel variant="on">
                  <input
                    v-model="payment.check_due_date"
                    type="date"
                    class="input"
                    :class="{ 'input-error': errors.check_due_date }"
                    :id="'check_due_date_' + index"
                  />
                  <label :for="'check_due_date_' + index" class="form-label required p-5">
                    {{ $t('invoicePayments.check_due_date') }}
                  </label>
                </FloatLabel>
                <small v-if="errors.check_due_date" class="error-message">
                  {{ errors.check_due_date }}
                </small>
              </Fluid>
            </div>
          </template>

          <!-- Wallet -->
          <div v-if="payment.wallets && payment.wallets.length" class="col-10 mt-1">
            <Select
              :key="'wallet_' + index + '_' + payment.wallets.length"
              v-model="payment.wallet_id"
              :options="payment.wallets"
              :optionLabel="bankAccountLabel"
              optionValue="id"
              :placeholder="$t('invoicePayments.wallets')"
              filter
              showClear
              class="w-full"
            />
            <small v-if="errors.wallet_id" class="error-message">
              {{ errors.wallet_id }}
            </small>
          </div>

          <!-- Mobile number (for wallet) -->
          <div v-if="payment.wallets && payment.wallets.length" class="col-10 mt-1">
            <Fluid>
              <FloatLabel variant="on">
                <InputText
                  :id="'mobile_number_' + index"
                  v-model="payment.mobile_number"
                  autocomplete="off"
                />
                <label :for="'mobile_number_' + index">
                  {{ $t('invoicePayments.mobile_number') }}
                </label>
              </FloatLabel>
              <small v-if="errors.mobile_number" class="error-message">
                {{ errors.mobile_number }}
              </small>
            </Fluid>
          </div>

          <!-- Notes -->
          <div class="col-10 mt-2">
            <textarea
              class="textarea"
              rows="3"
              :placeholder="$t('invoicePayments.notes')"
              v-model="payment.notes"
            />
          </div>
        </div>
      </div>

      <!-- Total -->
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
  name: 'UpdateInvoicePaymentsComponent',
  mixins: [customFunctions],

  components: {
    Button,
    InputNumber,
    InputText,
    FloatLabel,
    Fluid,
    Panel,
    Select,
  },

  emits: ['emitPaymentsData'],

  props: {
    errors: { type: Object, default: () => ({}) },
    company_id: { type: String, required: true },
    amount: { type: Number, default: 0 },
    payments: { type: Array, default: () => [] },
  },

  data() {
    return {
      isEmitting: false,
      initialized: false,
      isPopulating: false,
      localPayments: [],
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

  watch: {
    payments: {
      handler(newVal) {
        if (!this.initialized) {
          this.initialized = true
          this.populatePayments(newVal)
        }
      },
      immediate: true,
      deep: true,
    },

    
    localPayments: {
      handler(newVal) {
        if (this.isPopulating) return
        if (!this.isEmitting) {
          this.isEmitting = true
          this.$emit('emitPaymentsData', newVal)
          this.$nextTick(() => {
            this.isEmitting = false
          })
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.loadPaymentMethods(this.company_id)
  },

  methods: {
    calculatedAmount() {
      return this.localPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
    },

    async populatePayments(payments) {
      if (!payments || !payments.length) {
        this.localPayments = []
        return
      }

      if (!this.paymentMethods || !this.paymentMethods.length) {
        await this.loadPaymentMethods()
      }

      const newPayments = payments.map((payment) => ({
        bankAccounts: [],
        cashBoxs: [],
        wallets: [],
        selectedPaymentMethod: null,
        amount: payment.amount || 0,
        payment_method_id: payment.payment_method?.id || null,
        cash_box_id: payment.cash_box?.id || null,
        bank_account_id: payment.bank_account?.id || null,
        check_number: payment.check_number || null,
        check_due_date: payment.check_due_date || null,
        wallet_id: payment.wallet?.id || null,
        mobile_number: payment.mobile_number || null,
        notes: payment.notes || '',
      }))

      this.isPopulating = true
      this.localPayments = newPayments

      for (const payment of this.localPayments) {
        if (payment.payment_method_id) {
          await this.determineMethod(payment)
        }
      }

      this.isPopulating = false
    },

    async determineMethod(payment) {
      const selected = this.paymentMethods.find((m) => m.id === payment.payment_method_id)
      if (!selected) {
        payment.selectedPaymentMethod = null
        payment.bankAccounts = []
        payment.cashBoxs = []
        payment.wallets = []
        return
      }
      payment.selectedPaymentMethod = selected

      const currentBankAccountId = payment.bank_account_id
      const currentCashBoxId = payment.cash_box_id
      const currentWalletId = payment.wallet_id

      payment.bank_account_id = null
      payment.cash_box_id = null
      payment.wallet_id = null

      if (
        selected.prefix === 'CARD' ||
        selected.prefix === 'BANK_ACCOUNT' ||
        selected.prefix === 'CHECK'
      ) {
        if (!this.bankAccounts.length) await this.loadBankAccounts()
        payment.bankAccounts = [...this.bankAccounts]
        payment.cashBoxs = []
        payment.wallets = []
        if (
          currentBankAccountId &&
          payment.bankAccounts.some((b) => b.id === currentBankAccountId)
        ) {
          payment.bank_account_id = currentBankAccountId
        }
      } else if (selected.prefix === 'MOBILE_WALLET') {
        if (!this.wallets.length) await this.loadWallets()
        payment.wallets = [...this.wallets]
        payment.bankAccounts = []
        payment.cashBoxs = []
        if (currentWalletId && payment.wallets.some((w) => w.id === currentWalletId)) {
          payment.wallet_id = currentWalletId
        }
      } else if (selected.prefix === 'CASH') {
        if (!this.cashBoxs.length) await this.loadCashBoxs()
        payment.cashBoxs = [...this.cashBoxs]
        payment.bankAccounts = []
        payment.wallets = []
        if (currentCashBoxId && payment.cashBoxs.some((c) => c.id === currentCashBoxId)) {
          payment.cash_box_id = currentCashBoxId
        }
      }
    },

    addInvoicePaymentRow() {
      this.localPayments.push({
        amount: '',
        payment_method_id: null,
        cash_box_id: null,
        bank_account_id: null,
        check_number: null,
        check_due_date: null,
        wallet_id: null,
        mobile_number: null,
        notes: '',
        bankAccounts: [],
        cashBoxs: [],
        wallets: [],
        selectedPaymentMethod: null,
      })
    },

    deleteInvoicePaymentRow(index) {
      this.localPayments.splice(index, 1)
    },
  },
}
</script>
