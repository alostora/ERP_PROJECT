<template>
  <Panel :toggleable="true" :collapsed="true" style="background-color: var(--surface-100)">
    <template #header>
      <div class="flex items-center gap-2">
        <i class="pi pi-search text-warning p-1"></i>
        <span class="font-medium text-warning">
          {{ $t('common.search') }}
        </span>
      </div>
    </template>
    <div class="card-gray">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-12">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="invoice_name"
              v-model="filters.query_string"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('common.search')"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('branches.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="(onBranchChange(), emitFetchData())"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.warehouse_id"
              :options="warehouses"
              :optionLabel="warehouseLabel"
              optionValue="id"
              :placeholder="$t('warehouses.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.stage_id"
              :options="stages"
              :optionLabel="stageLabel"
              optionValue="id"
              :placeholder="$t('stages.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="invoice_name"
              v-model="filters.reference_code"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('salesInvoices.reference_code')"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.is_closed"
              :options="isColsedValues"
              optionLabel="name"
              optionValue="value"
              :placeholder="$t('salesInvoices.is_closed')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.contact_id"
              :options="contacts"
              optionLabel="name"
              optionValue="id"
              :placeholder="$t('contacts.title')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <FloatLabel variant="on">
            <DatePicker
              v-model="filters.date_from"
              inputId="date_from"
              showIcon
              showButtonBar
              iconDisplay="input"
              class="w-full"
              @update:modelValue="emitFetchData"
            />
            <label for="date_from">{{ $t('salesInvoices.date_from') }}</label>
          </FloatLabel>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <FloatLabel variant="on">
            <DatePicker
              v-model="filters.date_to"
              inputId="date_to"
              showIcon
              showButtonBar
              iconDisplay="input"
              class="w-full"
              @update:modelValue="emitFetchData"
            />
            <label for="date_to">{{ $t('salesInvoices.date_to') }}</label>
          </FloatLabel>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-6 col-md-3 col-lg-2">
          <Select
            v-model="filters.per_page"
            :options="perPageValues"
            optionLabel="name"
            optionValue="value"
            class="w-full"
            @change="emitFetchData"
          />
        </div>
      </div>
    </div>
  </Panel>
</template>

<script>
import DatePicker from 'primevue/datepicker'
import tableMixin from '@/mixins/table'
import { customFunctions } from '../custom_functions/customFunctions'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: { DatePicker },

  emits: ['emitFetchData'],

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
      isColsedValues: [
        { name: this.$t('common.no'), value: '0' },
        { name: this.$t('common.yes'), value: '1' },
      ],
      perPageValues: [
        { name: 5, value: 5 },
        { name: 10, value: 10 },
        { name: 25, value: 25 },
        { name: 50, value: 50 },
      ],
      filters: {
        per_page: 10,
        query_string: '',
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

    stageLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    this.loadBranches(this.company_id)
    this.loadStages(this.company_id)
    this.loadContacts(this.company_id)
  },

  methods: {
    emitFetchData() {
      this.$emit('emitFetchData', this.filters)
    },

    openUpdateStageModal(item) {
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.updateStageModal.openModal()
      })
    },
  },
}
</script>
