<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('bankAccounts.title') })"
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
            <label class="form-label">{{ $t('bankAccounts.is_default') }}</label>
            <div class="flex align-center">
              <ToggleSwitch v-model="formData.is_default" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-group">
            <Select
              v-model="formData.level_code"
              :options="levelCodeValues"
              optionLabel="name"
              optionValue="value"
              :showClear="true"
              :placeholder="$t('bankAccounts.level_code')"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="determineLevelCode"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <div class="form-group" v-if="this.formData.level_code === 2">
            <Select
              v-model="formData.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('common.select') + ' ' + $t('bankAccounts.branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
          <small v-if="errors.branch_id" class="error-message">{{ errors.branch_id }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('bankAccounts.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name_ar" v-model="formData.name_ar" autocomplete="on" class="w-full" />
              <label for="name_ar">{{ $t('bankAccounts.name_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText
                id="bank_name"
                v-model="formData.bank_name"
                autocomplete="on"
                class="w-full"
              />
              <label for="bank_name">{{ $t('bankAccounts.bank_name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.bank_name" class="error-message">{{ errors.bank_name }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText
                id="bank_name_ar"
                v-model="formData.bank_name_ar"
                autocomplete="on"
                class="w-full"
              />
              <label for="bank_name_ar">{{ $t('bankAccounts.bank_name_ar') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.bank_name_ar" class="error-message">{{ errors.bank_name_ar }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText
                id="account_number"
                v-model="formData.account_number"
                autocomplete="on"
                class="w-full"
              />
              <label for="account_number">{{ $t('bankAccounts.account_number') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.account_number" class="error-message">{{
            errors.account_number
          }}</small>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="iban" v-model="formData.iban" autocomplete="on" class="w-full" />
              <label for="iban">{{ $t('bankAccounts.iban') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.iban" class="error-message">{{ errors.iban }}</small>
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
      apiUrl: API_ROUTES.BANK_ACCOUNT.BASE,

      levelCodeValues: [
        { name: this.$t('bankAccounts.company'), value: 1 },
        { name: this.$t('bankAccounts.branch'), value: 2 },
      ],

      formData: {
        company_id: '',
        branch_id: '',
        name: '',
        name_ar: '',
        bank_name: '',
        bank_name_ar: '',
        account_number: '',
        iban: '',
        details: '',
        details_ar: '',
        level_code: '',
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
