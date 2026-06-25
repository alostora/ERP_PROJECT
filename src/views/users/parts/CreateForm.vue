<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('users.title') })"
    :modal="true"
    :style="{ width: '500px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <Select
              id="user_account_type_id"
              v-model="formData.user_account_type_id"
              :options="accountTypes"
              :optionLabel="accountTypeLabel"
              optionValue="id"
              :filter="true"
              :showClear="true"
              :placeholder="$t('common.select') + ' ' + $t('users.accountType')"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
            <small v-if="errors.user_account_type_id" class="error-message">
              {{ errors.user_account_type_id }}
            </small>
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('users.name') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="email" v-model="formData.email" autocomplete="on" class="w-full" />
              <label for="email">{{ $t('users.email') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
        </div>

        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="phone" v-model="formData.phone" autocomplete="on" class="w-full" />
              <label for="phone">{{ $t('users.phone') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.phone" class="error-message">{{ errors.phone }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Password id="password" v-model="formData.password" toggleMask />
              <label for="password">{{ $t('users.password') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.password" class="error-message">{{ errors.password }}</small>
        </div>

        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Password
                id="password_confirmation"
                v-model="formData.password_confirmation"
                toggleMask
              />
              <label for="password_confirmation">{{ $t('users.confirmPassword') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.password_confirmation" class="error-message">{{
            errors.password_confirmation
          }}</small>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <Textarea
                id="address"
                v-model="formData.address"
                rows="2"
                style="resize: none"
                fluid
              />
              <label for="address">{{ $t('users.address') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.address" class="error-message">{{ errors.address }}</small>
        </div>
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
import Password from 'primevue/password'

import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Password },
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

    accountTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
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
