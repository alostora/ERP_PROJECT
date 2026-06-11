<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('companies.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('clients.title') }}</label>
          <Select
            v-model="formData.client_id"
            :options="clients"
            optionLabel="name"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('clients.title')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
          />
          <small v-if="errors.client_id" class="error-message">{{ errors.client_id }}</small>
        </div>
      </div>

      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('companies.currency') }}</label>
          <Select
            v-model="formData.currency_id"
            :options="currencies"
            :optionLabel="currencyLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('companies.currency')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
          />
          <small v-if="errors.currency_id" class="error-message">{{ errors.currency_id }}</small>
        </div>
      </div>

      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('countries.title') }}</label>
          <Select
            v-model="formData.country_id"
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
          <small v-if="errors.country_id" class="error-message">{{ errors.country_id }}</small>
        </div>
      </div>

      <div class="form-group" v-if="governorates.length">
        <div class="col-12">
          <label class="form-label required">{{ $t('governorates.title') }}</label>
          <Select
            v-model="formData.governorate_id"
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
          <small v-if="errors.governorate_id" class="error-message">{{
            errors.governorate_id
          }}</small>
        </div>
      </div>

      <div class="form-group" v-if="cities.length">
        <div class="col-12">
          <label class="form-label required">{{ $t('cities.title') }}</label>
          <Select
            v-model="formData.city_id"
            :options="cities"
            :optionLabel="cityLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('cities.title')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
          />
          <small v-if="errors.city_id" class="error-message">{{ errors.city_id }}</small>
        </div>
      </div>

      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('companies.name') }}</label>
          <input
            v-model="formData.name"
            type="text"
            class="input"
            :class="{ 'input-error': errors.name }"
          />
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
      </div>

      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('companies.name_ar') }}</label>
          <input
            v-model="formData.name_ar"
            type="text"
            class="input"
            :class="{ 'input-error': errors.name_ar }"
          />
          <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
        </div>
      </div>

      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('companies.phone') }}</label>
          <input
            v-model="formData.phone"
            type="text"
            class="input"
            :class="{ 'input-error': errors.phone }"
          />
          <small v-if="errors.phone" class="error-message">{{ errors.phone }}</small>
        </div>
      </div>

      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('companies.email') }}</label>
          <input
            v-model="formData.email"
            type="text"
            class="input"
            :class="{ 'input-error': errors.email }"
          />
          <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
        </div>
      </div>

      <div class="form-group">
        <div class="col-12">
          <label class="form-label required">{{ $t('companies.address') }}</label>
          <input
            v-model="formData.address"
            type="text"
            class="input"
            :class="{ 'input-error': errors.address }"
          />
          <small v-if="errors.address" class="error-message">{{ errors.address }}</small>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="btn btn-outline ml-2 mr-2" @click="closeFormModal">
          {{ $t('common.cancel') }}
        </button>
        <button type="submit" class="btn btn-primary" :disabled="formLoading">
          {{ formLoading ? $t('common.loading') : $t('common.create') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import Select from 'primevue/select'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select },

  data() {
    return {
      apiUrl: API_ROUTES.COMPANY.BASE,
      formData: {
        currency_id: '',
        client_id: '',
        country_id: '',
        governorate_id: '',
        city_id: '',
        name: '',
        name_ar: '',
        phone: '',
        email: '',
        address: '',
      },
    }
  },

  mounted() {
    this.loadClients()
    this.loadCurrencies()
    this.loadCountries()
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },

    currencyLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
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

  methods: {
    async onCountryChange() {
      await this.loadGovernorates(this.formData.country_id)

      this.formData.governorate_id = ''
    },

    async onGovernorateChange() {
      await this.loadCities(this.formData.governorate_id)

      this.formData.city_id = ''
    },

    openModal() {
      this.openFormModal()
    },

    async handleSubmit() {
      if (!this.validateCreateForm(this.formData)) {
        return
      }

      await this.submitCreateForm(this.apiUrl, this.formData, this.$t('common.createdSuccessfully'))
    },
  },
}
</script>
