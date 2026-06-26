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
        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
              id="query_string"
              v-model="filters.query_string"
              @input="emitFetchData"
              autocomplete="off"
              class="input"
              :placeholder="$t('common.search')"
            />
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-6">
          <div class="search-wrapper">
            <Select
              v-model="filters.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :filter="true"
              :showClear="true"
              :placeholder="$t('cashBoxes.branches')"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="emitFetchData"
            />
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-12 col-md-6 col-lg-6">
          <Select
            v-model="filters.is_active"
            :options="statusValues"
            optionLabel="name"
            optionValue="value"
            :showClear="true"
            :placeholder="$t('cashBoxes.is_active')"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emitFetchData"
          />
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <Select
            v-model="filters.level_code"
            :options="levelCodeValues"
            optionLabel="name"
            optionValue="value"
            :showClear="true"
            :placeholder="$t('cashBoxes.level_code')"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emitFetchData"
          />
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
import tableMixin from '@/mixins/table'
import { customFunctions } from '../custom_functions/customFunctions'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {},

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
      statusValues: [
        { name: this.$t('common.yes'), value: 1 },
        { name: this.$t('common.no'), value: 0 },
      ],
      levelCodeValues: [
        { name: this.$t('cashBoxes.company'), value: 1 },
        { name: this.$t('cashBoxes.branch'), value: 2 },
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
  },

  mounted() {
    this.loadBranches(this.company_id)
  },

  methods: {
    emitFetchData() {
      this.$emit('emitFetchData', this.filters)
    },
  },
}
</script>
