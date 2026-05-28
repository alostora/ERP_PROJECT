<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('cities.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('cities.country') }}</label>

        <Select
          v-model="formData.country_id"
          :options="countries"
          :optionLabel="countryLabel"
          optionValue="id"
          :placeholder="$t('common.all') + ' ' + $t('countries.title')"
          :filter="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
          @change="onCountryChange"
        />
        <small v-if="errors.country_id" class="error-message">{{ errors.country_id }}</small>
      </div>

      <div class="form-group" v-if="governorates.length">
        <label class="form-label required">{{ $t('cities.governorate') }}</label>
        <Select
          v-model="formData.governorate_id"
          :options="governorates"
          :optionLabel="governorateLabel"
          optionValue="id"
          :placeholder="$t('common.all') + ' ' + $t('governorates.title')"
          :filter="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('cities.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('cities.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
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
      apiUrl: API_ROUTES.CITY.BASE,
      formData: {
        name: '',
        name_ar: '',
        country_id: '',
        governorate_id: '',
      },
    }
  },

  mounted() {
    this.loadCountries()
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
  },

  methods: {
    async onCountryChange() {
      await this.loadGovernorates(this.formData.country_id)

      this.formData.governorate_id = ''
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
