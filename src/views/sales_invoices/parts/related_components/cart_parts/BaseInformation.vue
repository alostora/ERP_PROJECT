<template>
  <!-- Base Information -->
  <div class="row mb-3">
    <div class="col-12">
      <div class="card-info">
        <div class="card-header-info">{{ $t('salesInvoices.base_info') }}</div>
        <div class="card-body">
          <!-- Row 1: Name -->
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
                    <label for="invoice_name">{{ $t('salesInvoices.name') }}</label>
                  </FloatLabel>
                </Fluid>
              </div>
              <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
            </div>
          </div>

          <!-- Row 2: Branch & Warehouse -->
          <div class="row">
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
                  :placeholder="$t('common.select') + ' ' + $t('salesInvoices.branch')"
                  :filterPlaceholder="$t('common.search')"
                  class="w-full"
                  @change="onBranchChange"
                />
                <small v-if="errors.branch_id" class="error-message text-danger"
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
                  :placeholder="$t('common.select') + ' ' + $t('salesInvoices.warehouse')"
                  :filterPlaceholder="$t('common.search')"
                  class="w-full"
                />
                <small v-if="errors.warehouse_id" class="error-message text-danger">
                  {{ errors.warehouse_id }}</small
                >
              </div>
            </div>
          </div>

          <!-- Row 3: Contact & Payment Type-->
          <div class="row">
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
                  :placeholder="$t('common.select') + ' ' + $t('salesInvoices.contact')"
                  :filterPlaceholder="$t('common.search')"
                  class="w-full"
                >
                  <template #option="{ option }">
                    <div class="flex items-center gap-2">
                      <div>{{ option.name + ' - ' + option.phone }}</div>
                    </div>
                  </template>

                  <template #footer>
                    <div class="p-2 border-t border-primary-100">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline w-full"
                        @click="openAddContactModal"
                      >
                        <i class="pi pi-plus text-success"></i>
                        {{ $t('common.addNew') }}
                      </button>
                      <button
                        v-if="localFormData.contact_id"
                        type="button"
                        class="btn btn-sm btn-outline w-full mt-1"
                        @click="openUpdateContactModal"
                        :disabled="!localFormData.contact_id"
                      >
                        <i class="pi pi-pencil text-primary"></i>
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
                  :placeholder="$t('common.select') + ' ' + $t('salesInvoices.payment_types')"
                  :filterPlaceholder="$t('common.search')"
                  class="w-full"
                />
                <small v-if="errors.payment_type_id" class="error-message text-danger">
                  {{ errors.payment_type_id }}</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Base Information -->

  <!-- Contact Create Modal -->
  <CreateContactForm ref="contactModal" :company_id="company_id" @created="onContactCreated" />
  <UpdateForm
    ref="updateContactModal"
    :selected_item="selectedContact"
    @updated="onContactUpdated"
  />
</template>

<script>
import Select from 'primevue/select'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Fluid from 'primevue/fluid'
import CreateContactForm from '@/views/contacts/parts/CreateForm.vue'
import UpdateForm from '@/views/contacts/parts/UpdateForm.vue'

import formMixin from '@/mixins/form'
import customFunctions from '../../../custom_functions/customFunctions'

export default {
  name: 'BaseInformation',

  mixins: [formMixin, customFunctions],

  components: {
    Select,
    InputText,
    Button,
    FloatLabel,
    Fluid,
    CreateContactForm,
    UpdateForm,
  },

  emits: [],

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
  },

  methods: {
    emitCloseFormModal() {
      this.$emit('closeForm')
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
