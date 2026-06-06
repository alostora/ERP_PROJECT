<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('bankAccounts.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('bankAccounts.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('bankAccounts.name_ar') }}</label>
        <input
          v-model="formData.name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name_ar }"
        />
        <small v-if="errors.name_ar" class="error-message">{{ errors.name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('bankAccounts.bank_name') }}</label>
        <input
          v-model="formData.bank_name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.bank_name }"
        />
        <small v-if="errors.bank_name" class="error-message">{{ errors.bank_name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('bankAccounts.bank_name_ar') }}</label>
        <input
          v-model="formData.bank_name_ar"
          type="text"
          class="input"
          :class="{ 'input-error': errors.bank_name_ar }"
        />
        <small v-if="errors.bank_name_ar" class="error-message">{{ errors.bank_name_ar }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('bankAccounts.account_number') }}</label>
        <input
          v-model="formData.account_number"
          type="text"
          class="input"
          :class="{ 'input-error': errors.account_number }"
        />
        <small v-if="errors.account_number" class="error-message">{{
          errors.account_number
        }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('bankAccounts.iban') }}</label>
        <input
          v-model="formData.iban"
          type="text"
          class="input"
          :class="{ 'input-error': errors.iban }"
        />
        <small v-if="errors.iban" class="error-message">{{ errors.iban }}</small>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="btn btn-outline ml-2 mr-2" @click="closeFormModal">
          {{ $t('common.cancel') }}
        </button>
        <button type="submit" class="btn btn-primary" :disabled="formLoading">
          {{ formLoading ? $t('common.loading') : $t('common.update') }}
        </button>
      </div>
    </form>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog },

  props: {
    selected_item: {
      type: Object,
      default: () => ({}),
    },
  },

  watch: {
    selected_item: {
      immediate: true,
      deep: true,
      handler(selectedItem) {
        if (selectedItem && selectedItem.id) {
          this.populateForm(selectedItem)
        }
      },
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.BANK_ACCOUNT.BASE,
      formData: {
        id: '',
        name: '',
        name_ar: '',
        bank_name: '',
        bank_name_ar: '',
        account_number: '',
        iban: '',
      },
    }
  },

  mounted() {},

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },

  methods: {
    populateForm(selectedItem) {
      this.formData = {
        id: selectedItem.id || '',
        name: selectedItem.name || '',
        name_ar: selectedItem.name_ar || '',
        bank_name: selectedItem.bank_name || '',
        bank_name_ar: selectedItem.bank_name_ar || '',
        account_number: selectedItem.account_number || '',
        iban: selectedItem.iban || '',
      }
    },

    openModal() {
      this.formVisible = true
    },

    async handleSubmit() {
      if (!this.validateUpdateForm(this.formData)) {
        return
      }

      const data = { ...this.formData }
      delete data.id

      await this.submitUpdateForm(
        this.apiUrl,
        this.formData.id,
        data,
        this.$t('common.updatedSuccessfully')
      )
    },
  },
}
</script>
