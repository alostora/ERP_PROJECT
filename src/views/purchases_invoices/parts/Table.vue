<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('purchasesInvoices.title') }}</h1>
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
        <Column field="id" :header="$t('purchasesInvoices.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column
          field="reference_code"
          :header="$t('purchasesInvoices.reference_code')"
          class="col-2"
        />

        <Column field="name" :header="$t('purchasesInvoices.name')" class="col-2" />

        <Column :header="$t('purchasesInvoices.branch')" class="col-1">
          <template #body="{ data }">
            <div class="badge badge-info">
              {{ currentLanguage == 'ar' ? data.branch?.name_ar : data.branch?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoices.stage')" class="col-1">
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

        <Column :header="$t('purchasesInvoices.is_closed')" class="col-1">
          <template #body="{ data }">
            <div v-if="data.is_closed" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else="data.is_closed" class="badge badge-warning">
              {{ $t('common.no') }}
            </div>
          </template>
        </Column>

        <Column :header="$t('purchasesInvoices.contact')" class="col-1">
          <template #body="{ data }">
            {{ data.contact?.name || '-' }}
          </template>
        </Column>

        <Column
          field="net_amount_after_costs_and_discounts"
          :header="$t('purchasesInvoices.net_amount_after_costs_and_discounts')"
          class="col-1"
        />

        <Column :header="$t('purchasesInvoices.returns')">
          <template #body="{ data }">
            <button
              class="btn-sm btn-outline"
              @click="
                $router.push({
                  name: 'purchases-invoices-returns',
                  params: {
                    purchases_invoice_id: data.id,
                    company_id: company_id,
                    branch_id: branch_id,
                  },
                })
              "
            >
              <i class="pi pi-link text-primary"></i>
              {{ $t('purchasesInvoices.returns') }}
            </button>
          </template>
        </Column>

        <Column field="created_at" :header="$t('purchasesInvoices.createdAt')" class="col-1">
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
      ref="createModal"
      @created="fetchData"
      :company_id="company_id"
      :branch_id="branch_id"
    />

    <UpdateForm
      ref="updateModal"
      :company_id="company_id"
      :branch_id="branch_id"
      :purchases_invoice_id="purchases_invoice_id"
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
import Button from 'primevue/button'

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
    Button,
    CreateForm,
    UpdateForm,
    UpdateStageForm,
    Filter,
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

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.apiUrl = `${API_ROUTES.PURCHASES_INVOICE.SEARCH}/${newVal}`
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
      apiUrl: API_ROUTES.PURCHASES_INVOICE.SEARCH,
      deleteUrl: API_ROUTES.PURCHASES_INVOICE.BASE,
      filters: { query_string: '' },
      purchases_invoice_id: '',
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
      this.purchases_invoice_id = itemId
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },
  },
}
</script>
