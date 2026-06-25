<template>
  <div class="">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-6">
        <div class="search-wrapper">
          <i class="pi pi-search search-icon"></i>
          <InputText
            id="invoice_name"
            v-model="filters.query_string"
            @input="emiFetchData"
            autocomplete="off"
            class="input"
            :placeholder="$t('common.search')"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-6">
        <div class="search-wrapper">
          <Select
            v-model="filters.client_id"
            :options="clients"
            optionLabel="name"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('clients.title')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="emiFetchData"
          />
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="search-wrapper">
          <Select
            v-model="filters.country_id"
            :options="countries"
            :optionLabel="countryLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('countries.title')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="onCountryChange"
          />
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-4" v-if="filters.country_id">
        <div class="search-wrapper">
          <Select
            v-model="filters.governorate_id"
            :options="governorates"
            :optionLabel="governorateLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('governorates.title')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="onGovernorateChange"
          />
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-4" v-if="filters.governorate_id">
        <Select
          v-model="filters.city_id"
          :options="cities"
          :optionLabel="cityLabel"
          optionValue="id"
          :placeholder="$t('common.all') + ' ' + $t('cities.title')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
          @change="emiFetchData"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-md-3 col-lg-2 mt-2 mt-md-0">
        <Select
          v-model="filters.per_page"
          :options="perPageValues"
          optionLabel="name"
          optionValue="value"
          class="w-full"
          @change="emiFetchData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import tableMixin from '@/mixins/table'
import { customFunctions } from '../custom_functions/customFunctions'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'

export default {
  name: 'Table',
  mixins: [tableMixin, customFunctions],
  components: {
    Select,
    InputText,
  },

  emits: ['emiFetchData'],

  data() {
    return {
      perPageValues: [
        { name: 5, value: 5 },
        { name: 10, value: 10 },
        { name: 25, value: 25 },
        { name: 50, value: 50 },
      ],
      filters: {
        per_page: 10,
        query_string: '',
        client_id: '',
        country_id: '',
        governorate_id: '',
        city_id: '',
      },
      selectedItem: {},
    }
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    countryLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    governorateLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },

    cityLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  mounted() {
    const countryId = this.$route.query.country_id

    if (countryId) {
      this.filters.country_id = countryId
      this.loadGovernorates(countryId)
    }

    const governorateId = this.$route.query.governorate_id

    if (governorateId) {
      this.filters.governorate_id = governorateId
    }

    this.loadClients()
    this.loadCountries()
  },

  methods: {
    emiFetchData() {
      this.$emit('emiFetchData', this.filters)
    },

    async onCountryChange() {
      this.filters.governorate_id = ''
      this.filters.city_id = ''

      await this.loadGovernorates(this.filters.country_id)

      this.$emit('emiFetchData', this.filters)
    },

    async onGovernorateChange() {
      this.filters.city_id = ''

      await this.loadCities(this.filters.governorate_id)

      this.$emit('emiFetchData', this.filters)
    },
  },
}
</script>
