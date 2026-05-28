<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('users.title') })"
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
        <label class="form-label required">{{ $t('users.password') }}</label>
        <input
          v-model="formData.password"
          type="password"
          class="input"
          :class="{ 'input-error': errors.password }"
        />
        <small v-if="errors.password" class="error-message">{{ errors.password }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('users.confirmPassword') }}</label>
        <input v-model="formData.password_confirmation" type="password" class="input" />
        <small v-if="errors.password_confirmation" class="error-message">{{
          errors.password_confirmation
        }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.phone') }}</label>
        <input v-model="formData.phone" type="text" class="input" />
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('users.address') }}</label>
        <textarea v-model="formData.address" class="textarea" rows="3"></textarea>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="btn btn-outline" @click="closeFormModal">
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
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog },
  data() {
    return {
      apiUrl: API_ROUTES.USER.BASE,
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        user_account_type_id: '',
      },
    }
  },
  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },
  methods: {
    openModal() {
      this.openFormModal()
      this.loadAccountTypes()
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
