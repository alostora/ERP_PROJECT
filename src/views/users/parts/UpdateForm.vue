<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('users.title') })"
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
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">{{ $t('users.passwordLeaveBlank') }}</label>
            <FloatLabel variant="on">
              <Password id="password" v-model="formData.password" toggleMask />
              <label for="password">{{ $t('users.password') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.password" class="error-message">{{ errors.password }}</small>
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
import tableMixin from '@/mixins/table'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, tableMixin, customFunctions, validationRequest],
  components: { Password },

  props: {
    item_id: {
      type: String,
      required: true,
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

    accountTypeLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    populateForm() {
      this.formData = {
        id: this.itemData.id || '',
        name: this.itemData.name || '',
        email: this.itemData.email || '',
        phone: this.itemData.phone || '',
        password: '',
        address: this.itemData.address || '',
        user_account_type_id: this.itemData.account_type?.id || '',
      }
    },

    async openModal() {
      this.formVisible = true

      await this.showItem(this.apiUrl, this.item_id)
      this.populateForm()
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
