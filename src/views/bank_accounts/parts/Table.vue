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
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="search-wrapper">
              <i class="pi pi-search search-icon"></i>
              <input
                type="text"
                v-model="filters.query_string"
                @input="fetchData"
                class="input"
                :placeholder="$t('common.search')"
              />
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-4 mb-1">
            <Select
              v-model="filters.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('common.all') + ' ' + $t('bankAccounts.branches')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="fetchData"
            />
          </div>

          <div class="col-12 col-md-6 col-lg-4 mb-1">
            <select v-model="filters.is_active" @change="fetchData" class="select">
              <option :value="null">
                {{ $t('bankAccounts.is_active') + ' ' + $t('common.all') }}
              </option>
              <option :value="1">
                {{ $t('bankAccounts.is_active') + ' ' + $t('common.yes') }}
              </option>
              <option :value="0">
                {{ $t('bankAccounts.is_active') + ' ' + $t('common.no') }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-6 col-lg-4 mb-1">
            <select v-model="filters.level_code" @change="fetchData" class="select">
              <option :value="null">
                {{ $t('bankAccounts.level_code') + ' ' + $t('common.all') }}
              </option>
              <option :value="1">
                {{ $t('bankAccounts.level_code') + ' ' + $t('bankAccounts.company') }}
              </option>
              <option :value="2">
                {{ $t('bankAccounts.level_code') + ' ' + $t('bankAccounts.branch') }}
              </option>
            </select>
          </div>

          <div class="col-6 col-md-3 col-lg-2">
            <select v-model="perPage" @change="fetchData" class="select">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>
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
              {{ currentLanguage == 'ar' ? data.level_code?.name_ar : data.level_code?.name }}
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
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import CreateForm from './CreateForm.vue'
import UpdateForm from './UpdateForm.vue'
import { customFunctions } from '../custom_functions/customFunctions'
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'
import ToggleSwitch from 'primevue/toggleswitch'
import Select from 'primevue/select'

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
    Select,
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

    branchLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.fetchData()
    this.loadBranches(this.company_id)
  },

  methods: {
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
