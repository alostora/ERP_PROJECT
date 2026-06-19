<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('wallets.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input type="hidden" v-model="formData.company_id" />
        <small v-if="errors.company_id" class="error-message">{{ errors.company_id }}</small>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="form-label">{{ $t('wallets.is_default') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_default" />
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('wallets.level_code') }}</label>
        <select v-model="formData.level_code" @change="determineLevelCode" class="select">
          <option :value="1">{{ $t('wallets.company') }}</option>
          <option :value="2">{{ $t('wallets.branch') }}</option>
        </select>
      </div>

      <div class="form-group" v-if="this.formData.level_code === 2">
        <label class="form-label required">{{ $t('wallets.branches') }}</label>
        <Select
          v-model="formData.branch_id"
          :options="branches"
          :optionLabel="branchLabel"
          optionValue="id"
          :placeholder="$t('common.select') + ' ' + $t('wallets.branch')"
          :filter="true"
          :showClear="true"
          :filterPlaceholder="$t('common.search')"
          class="w-full"
        />
        <small v-if="errors.branch_id" class="error-message">{{ errors.branch_id }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('wallets.provider') }}</label>
        <select v-model="formData.provider_code" class="select">
          <option :value="1">{{ $t('wallets.vodafone') }}</option>
          <option :value="2">{{ $t('wallets.orange') }}</option>
          <option :value="3">{{ $t('wallets.etisalat') }}</option>
          <option :value="4">{{ $t('wallets.fawry') }}</option>
          <option :value="4">{{ $t('wallets.other') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('wallets.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('wallets.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('wallets.owner_name') }}</label>
        <input
          v-model="formData.owner_name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.owner_name }"
        />
        <small v-if="errors.owner_name" class="error-message">{{ errors.owner_name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('wallets.mobile_number') }}</label>
        <input
          v-model="formData.mobile_number"
          type="text"
          class="input"
          :class="{ 'input-error': errors.mobile_number }"
        />
        <small v-if="errors.mobile_number" class="error-message">{{ errors.mobile_number }}</small>
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
import ToggleSwitch from 'primevue/toggleswitch'
import Select from 'primevue/select'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, ToggleSwitch, Select },

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
      apiUrl: API_ROUTES.WALLET.BASE,
      formData: {
        company_id: '',
        branch_id: '',
        name: '',
        name_ar: '',
        owner_name: '',
        mobile_number: '',
        details: '',
        details_ar: '',
        level_code: '',
        provider_code: '',
        is_default: false,
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
  methods: {
    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id
    },

    determineLevelCode() {
      if (this.formData.level_code === 2) {
        this.loadBranches(this.company_id)
      }
      if (this.formData.level_code === 1) {
        this.formData.branch_id = ''
      }
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
