<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">
        {{ $t('purchasesInvoicesReturns.title') }}
        <Message severity="info" size="small">
          ({{ parentInvoice?.reference_code }})
          <Badge size="small"> ({{ parentInvoice?.name }}) </Badge>
        </Message>
      </h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="filters-bar">
        <Filter @emitFetchData="emitFetchData" :company_id="company_id" :branch_id="branch_id" />
      </div>

      <DataTable
        :value="items"
        :paginator="true"
        :rows="perPage"
        :totalRecords="meta.total"
        :rowsPerPageOptions="[5, 10, 25, 50]"
        :loading="loading"
        lazy
        @page="onPageChange"
        @sort="onSort"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        resizableColumns
        showGridlines
      >
        <Column field="id" :header="$t('purchasesInvoicesReturns.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column
          field="reference_code"
          :header="$t('purchasesInvoicesReturns.reference_code')"
          class="col-2"
        />

        <Column field="name" :header="$t('purchasesInvoicesReturns.name')" class="col-2" />

        <Column :header="$t('purchasesInvoicesReturns.branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.branch?.name_ar : data.branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoicesReturns.stage')" class="col-1">
          <template #body="{ data }">
            <div :class="data.stage?.affects_stock ? 'badge badge-success' : 'badge badge-warning'">
              {{ currentLanguage == 'ar' ? data.stage?.name_ar : data.stage?.name }}

              <Button
                :severity="data.stage?.affects_stock ? 'success' : 'warn'"
                variant="outlined"
                class="ml-1 mr-1 btn btn-sm"
                :icon="currentLanguage == 'ar' ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
                @click="openUpdateStageModal(data)"
                :title="
                  $t('common.edit') +
                  ' ' +
                  (currentLanguage == 'ar' ? data.stage?.name_ar : data.stage?.name)
                "
                style="height: 20px"
              >
              </Button>
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoicesReturns.is_closed')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.is_closed" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.is_closed" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoicesReturns.contact')" class="col-1">
          <template #body="{ data }">
            {{ data.contact?.name || '-' }}
          </template>
        </Column>

        <Column
          field="net_amount_after_costs_and_discounts"
          :header="$t('purchasesInvoicesReturns.net_amount_after_costs_and_discounts')"
          class="col-1"
        />

        <Column field="created_at" :header="$t('purchasesInvoicesReturns.createdAt')" class="col-1">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
          </template>
        </Column>

        <Column :header="$t('common.actions')" class="col-1">
          <template #body="{ data }">
            <div class="actions-cell">
              <button class="btn-icon" @click="openUpdateModal(data.id)" :title="$t('common.edit')">
                <i class="pi pi-pen-to-square text-success"></i>
              </button>
              <button
                class="btn-icon text-danger"
                @click="deleteRow(data)"
                :title="$t('common.delete')"
              >
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <CreateForm
      :purchases_invoice_id="purchases_invoice_id"
      :company_id="company_id"
      :branch_id="branch_id"
      ref="createModal"
      @created="fetchData"
    />

    <UpdateForm
      :purchases_invoice_return_id="purchases_invoice_return_id"
      :purchases_invoice_id="purchases_invoice_id"
      :company_id="company_id"
      :branch_id="branch_id"
      ref="updateModal"
      @updated="fetchData"
    />

    <UpdateStageForm
      ref="updateStageModal"
      :company_id="company_id"
      :branch_id="branch_id"
      :selected_item="selectedItem"
      @updated="fetchData"
    />

    <Toast />

    <ConfirmDialog />
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Badge from 'primevue/badge'

import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import UpdateStageForm from './UpdateStageForm.vue'
import Filter from './Filter.vue'

import { API_ROUTES } from '@/constants/apiRoutes'
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {
    DataTable,
    Column,
    Toast,
    ConfirmDialog,
    DatePicker,
    Button,
    Message,
    Badge,
    CreateForm,
    UpdateForm,
    UpdateStageForm,
    Filter,
  },

  props: {
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

  watch: {
    '$route.params.purchases_invoice_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.loadParentInvoice(newVal)
          this.filters.purchases_invoice_id = newVal
        }
      },
      immediate: true,
    },
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.apiUrl = `${API_ROUTES.PURCHASES_INVOICE_RETURN.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
    '$route.params.branch_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.filters.branch_id = newVal
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PURCHASES_INVOICE_RETURN.SEARCH,
      deleteUrl: API_ROUTES.PURCHASES_INVOICE_RETURN.BASE,
      filters: { query_string: '' },
      purchases_invoice_return_id: '',
      selectedItem: {},
    }
  },
  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    emitFetchData(emitedData) {
      this.filters = emitedData
      this.fetchData()
    },

    openCreateModal() {
      this.$refs.createModal.openModal()
    },

    openUpdateModal(itemId) {
      this.purchases_invoice_return_id = itemId
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    openUpdateStageModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateStageModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
