<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('users.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="form-label required">{{ $t('users.accountType') }}</label>
        <select
          v-model="formData.user_account_type_id"
          class="select"
          :class="{ 'input-error': errors.user_account_type_id }"
        >
          <option value="">{{ $t('common.select') }} {{ $t('users.accountType') }}</option>
          <option v-for="type in accountTypes" :key="type.id" :value="type.id">
            {{ currentLanguage === 'ar' ? type.name_ar : type.name }}
          </option>
        </select>
        <small v-if="errors.user_account_type_id" class="error-message">{{
          errors.user_account_type_id
        }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('users.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('users.email') }}</label>
        <input
          v-model="formData.email"
          type="email"
          class="input"
          :class="{ 'input-error': errors.email }"
        />
        <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.phone') }}</label>
        <input v-model="formData.phone" type="text" class="input" />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.passwordLeaveBlank') }}</label>
        <input v-model="formData.password" type="password" class="input" />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.address') }}</label>
        <textarea v-model="formData.address" class="textarea" rows="3"></textarea>
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
      apiUrl: API_ROUTES.USER.BASE,
      formData: {
        id: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        user_account_type_id: '',
      },
      errors: {},
    }
  },

  mounted() {
    this.loadAccountTypes()
  },

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
        email: selectedItem.email || '',
        phone: selectedItem.phone || '',
        password: '',
        address: selectedItem.address || '',
        user_account_type_id: selectedItem.account_type?.id || '',
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
      if (!data.password) delete data.password

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
