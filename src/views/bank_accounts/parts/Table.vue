<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">{{ $t('bankAccounts.title') }}</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="pi pi-plus"></i>
        {{ $t('common.addNew') }}
      </button>
    </div>

    <div class="card">
      <div class="filters-bar">
        <Filter @emitFetchData="emitFetchData" :company_id="company_id" />
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
        <Column field="id" :header="$t('bankAccounts.id')" class="col-1">
          <template #body="slotProps">
            <span class="font-mono text-sm">{{ slotProps.index + 1 }}</span>
          </template>
        </Column>

        <Column field="name" :header="$t('bankAccounts.name')" />

        <Column field="name_ar" :header="$t('bankAccounts.name_ar')" />

        <Column field="bank_name" :header="$t('bankAccounts.bank_name')" />

        <Column field="bank_name_ar" :header="$t('bankAccounts.bank_name_ar')" />

        <Column field="account_number" :header="$t('bankAccounts.account_number')" />

        <Column field="iban" :header="$t('bankAccounts.iban')" />

        <Column field="balance" :header="$t('bankAccounts.balance')" />

        <Column :header="$t('bankAccounts.level_code')">
          <template #body="{ data }">
            <div class="badge badge-primary">
              {{ currentLanguage == 'ar' ? data.level?.name_ar : data.level?.name }}
            </div>
          </template>
        </Column>

        <Column :header="$t('bankAccounts.is_default')">
          <template #body="{ data }">
            <div v-if="data.is_default" class="badge badge-success">
              {{ $t('common.yes') }}
            </div>
            <div v-else-if="!data.is_default">
              <ToggleSwitch v-model="data.is_default" @change="setDefaultBankAccount(data.id)" />
            </div>
          </template>
        </Column>

        <Column :header="$t('bankAccounts.is_active')">
          <template #body="{ data }">
            <ToggleSwitch v-model="data.is_active" @change="toggleActive(data)" />
            {{ data.is_active ? $t('common.yes') : $t('common.no') }}
          </template>
        </Column>

        <Column field="created_at" :header="$t('bankAccounts.createdAt')" class="col-2">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
          </template>
        </Column>

        <Column :header="$t('common.actions')">
          <template #body="{ data }">
            <div class="actions-cell">
              <button class="btn-icon" @click="openUpdateModal(data)" :title="$t('common.edit')">
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

    <CreateForm ref="createModal" @created="fetchData" :company_id="company_id" />
    <UpdateForm ref="updateModal" :selected_item="selectedItem" @updated="fetchData" />

    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import ConfirmDialog from 'primevue/confirmdialog'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ToggleSwitch from 'primevue/toggleswitch'
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
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
    CreateForm,
    UpdateForm,
    ToggleSwitch,
    Filter,
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.company_id = newVal
          this.apiUrl = `${API_ROUTES.BANK_ACCOUNT.SEARCH}/${newVal}`
        }
      },
      immediate: true,
    },
  },

  props: {
    branch_id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.BANK_ACCOUNT.SEARCH,
      deleteUrl: API_ROUTES.BANK_ACCOUNT.BASE,
      company_id: '',
      filters: { query_string: '', is_active: null, level_code: null, branch_id: '' },
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

    openUpdateModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateModal.openModal()
      })
    },

    deleteRow(item) {
      this.deleteItem(this.deleteUrl, item.id, item.name)
    },

    toggleActive(item) {
      if (item.is_active == false) {
        this.setInactiveBankAccount(item.id)
      } else {
        this.setActiveBankAccount(item.id)
      }
    },
  },
}
</script>
