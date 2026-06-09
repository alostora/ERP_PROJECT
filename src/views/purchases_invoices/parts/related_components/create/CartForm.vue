<template>
  <div class="card border col-12 col-lg-3">
    <div v-if="formLoading" class="flex-center py-6">
      <div class="card flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
    <form v-else @submit.prevent="handleSubmit">
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

      <!-- Contact Create Modal  -->
      <CreateContactForm ref="contactModal" :company_id="company_id" @created="onContactCreated" />
      <UpdateForm
        ref="updateContactModal"
        :selected_item="selectedContact"
        @updated="onContactUpdated"
      />
      <!-- Contact Create Modal -->
    </form>
  </div>
</template>

<script>
import Select from 'primevue/select'
import ProgressSpinner from 'primevue/progressspinner'
import CreateContactForm from '@/views/contacts/parts/CreateForm.vue'
import UpdateForm from '@/views/contacts/parts/UpdateForm.vue'
import formMixin from '@/mixins/form'
import customFunctions from '../../../custom_functions/customFunctions'

export default {
  name: 'CartForm',

  mixins: [formMixin, customFunctions],

  components: { Select, ProgressSpinner, CreateContactForm, UpdateForm },

  emits: [
    'handelFormData',
    'submit' /* 'close', 'branch-changed', 'contact-created', 'contact-updated' */,
  ],

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
      },
      selectedContact: {},
    }
  },

  mounted() {
    this.loadBranches(this.localFormData.company_id)

    this.loadContacts(this.localFormData.company_id)

    this.loadPaymentTypes()
  },

  methods: {
    handleSubmit() {
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
  },
}
</script>
