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

      <!-- Branches -->
      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.from_branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('transportRequests.from_branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="(onFromBranchChange(), emitFetchData())"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.from_warehouse_id"
              :options="fromWarehouses"
              :optionLabel="warehouseLabel"
              optionValue="id"
              :placeholder="$t('transportRequests.from_warehouse')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData()"
            />
          </div>
        </div>
      </div>

      <!-- Warehouses -->
      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.to_branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('transportRequests.to_branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="(onToBranchChange(), emitFetchData())"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.to_warehouse_id"
              :options="toWarehouses"
              :optionLabel="warehouseLabel"
              optionValue="id"
              :placeholder="$t('transportRequests.to_warehouse')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData()"
            />
          </div>
        </div>
      </div>

      <!-- Stages -->
      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.from_warehouse_stage_id"
              :options="stages"
              :optionLabel="stageLabel"
              optionValue="id"
              :placeholder="$t('transportRequests.from_warehouse_stage')"
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
              v-model="filters.to_warehouse_stage_id"
              :options="stages"
              :optionLabel="stageLabel"
              optionValue="id"
              :placeholder="$t('transportRequests.to_warehouse_stage')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <!-- Is Colsed -->
      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.from_warehouse_is_closed"
              :options="isColsedValues"
              optionLabel="name"
              optionValue="value"
              :placeholder="$t('transportRequests.from_warehouse_is_closed')"
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
              v-model="filters.to_warehouse_is_closed"
              :options="isColsedValues"
              optionLabel="name"
              optionValue="value"
              :placeholder="$t('transportRequests.to_warehouse_is_closed')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
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
              <label for="date_from">{{ $t('transportRequests.date_from') }}</label>
            </FloatLabel>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
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
              <label for="date_to">{{ $t('transportRequests.date_to') }}</label>
            </FloatLabel>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6 col-md-3 col-lg-2 mt-2">
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
  name: 'Filter',
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
  },

  methods: {
    emitFetchData() {
      this.$emit('emitFetchData', this.filters)
    },
  },
}
</script>
