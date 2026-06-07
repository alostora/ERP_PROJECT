<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('purchasesInvoices.title') })"
    modal
    maximizable
    :style="{ width: '80vw', minWidth: '800px' }"
    @hide="closeFormModal"
  >
    <div v-if="formLoading" class="flex-center py-6">
      <div class="card flex justify-center">
        <ProgressSpinner />
      </div>
    </div>
    <div v-else>
      <div class="row border">
        <!-- Products Grid -->
        <div class="col-12 col-lg-8">
          <div class="row">
            <div class="col-3 col-md-3" v-for="product in finalProducts" :key="product.id">
              <div class="border rounded m-2 p-3">
                <div class="mb-4">
                  <div class="relative mx-auto">
                    <img
                      :src="
                        product.main_image?.file?.file_path ||
                        'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'
                      "
                      :alt="product.name"
                      class="w-full h-48 object-cover rounded"
                    />

                    <Tag
                      :value="product.total_company_stock_quantity ? 'In Stock' : 'Out Of Stock'"
                      :severity="product.total_company_stock_quantity ? 'success' : 'danger-1'"
                      class="absolute"
                      style="left: 5px; top: 5px"
                    />
                  </div>
                </div>

                <div
                  class="mb-4 font-medium truncate inline-block"
                  style="max-width: 100%"
                  :title="product.name"
                >
                  {{ product.name + product.name }}
                </div>

                <div class="flex justify-between items-center">
                  <div class="row justify-between align-center mt-2">
                    <div class="col-auto font-semibold text-xl">
                      {{ product.grand_total_price }}
                    </div>
                    <div class="col-auto">
                      <Button icon="pi pi-heart" severity="secondary" variant="outlined" />
                      <Button icon="pi pi-shopping-cart" class="ml-2 mr-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Products Grid -->

        <!-- Cart Form -->
        <div class="col-12 col-lg-4">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input type="hidden" v-model="formData.company_id" />
              <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
            </div>

            <!-- Name -->
            <div class="form-group">
              <label class="form-label">{{ $t('purchasesInvoices.name') }}</label>
              <input
                v-model="formData.name"
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
                v-model="formData.branch_id"
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
            <div class="form-group" v-if="formData.branch_id">
              <label class="form-label required">{{ $t('purchasesInvoices.warehouses') }}</label>
              <Select
                v-model="formData.warehouse_id"
                :options="warehouses"
                :optionLabel="warehouseLabel"
                optionValue="id"
                :placeholder="$t('common.select') + ' ' + $t('purchasesInvoices.warehouse')"
                :filter="true"
                :showClear="true"
                :filterPlaceholder="$t('common.search')"
                class="w-full"
              />
              <small v-if="errors.warehouse_id" class="error-message">{{
                errors.warehouse_id
              }}</small>
            </div>
            <!-- End Warehouse -->

            <!-- Contact -->
            <div class="form-group">
              <label class="form-label required">{{ $t('purchasesInvoices.contacts') }}</label>
              <Select
                v-model="formData.contact_id"
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
                      v-if="formData.contact_id"
                      type="button"
                      class="btn btn-sm btn-outline w-full"
                      @click="openUpdateContactModal"
                      :disabled="!formData.contact_id"
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
                v-model="formData.payment_type_id"
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

            <CreateContactForm
              ref="contactModal"
              :company_id="company_id"
              @created="onContactCreated"
            />
            <UpdateForm
              ref="updateContactModal"
              :selected_item="selectedItem"
              @updated="onContactUpdated"
            />
            <!-- Contact Create Modal -->

            <div class="flex justify-end gap-2 mt-4">
              <button type="button" class="btn btn-outline" @click="closeFormModal">
                {{ $t('common.cancel') }}
              </button>
              <button type="submit" class="btn btn-primary ml-2 mr-2" :disabled="formLoading">
                {{ formLoading ? $t('common.loading') : $t('common.create') }}
              </button>
            </div>
          </form>
        </div>
        <!-- End Cart Form -->
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Select from 'primevue/select'
import ProgressSpinner from 'primevue/progressspinner'
import CreateContactForm from '@/views/contacts/parts/CreateForm.vue'
import UpdateForm from '@/views/contacts/parts/UpdateForm.vue'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: {
    Dialog,
    Tag,
    Button,
    Select,
    ProgressSpinner,
    CreateContactForm,
    UpdateForm,
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
        company_id: '',
        branch_id: '',
        contact_id: '',
        payment_type_id: '',
        name: '',
      },
      selectedItem: {},
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
  methods: {
    openModal() {
      this.openFormModal()

      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id

      this.loadFinalProducts(this.formData.company_id)
      this.loadBranches(this.formData.company_id)

      if (this.formData.branch_id) {
        this.loadWarehouses(this.formData.company_id, this.formData.branch_id)
      }

      this.loadContacts(this.formData.company_id)
      this.loadPaymentTypes()
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) {
        return
      }

      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },

    ///////////////////// Contact Methods /////////////////////

    openUpdateContactModal() {
      // Find the selected contact
      this.selectedItem = this.contacts.find((c) => c.id === this.formData.contact_id)

      if (this.selectedItem) {
        this.$refs.updateContactModal.openModal()
      }
    },

    onContactUpdated(updatedContact) {
      const index = this.contacts.findIndex((c) => c.id === updatedContact.id)
      if (index !== -1) {
        this.contacts[index] = updatedContact
      }

      this.formData.contact_id = updatedContact.id
    },

    openAddContactModal() {
      this.$refs.contactModal.openModal()
    },

    onContactCreated(newContact) {
      if (!newContact || !newContact.id) return

      this.contacts.unshift(newContact)
      this.formData.contact_id = newContact.id
    },

    ///////////////////// Contact Methods /////////////////////
  },
}
</script>
