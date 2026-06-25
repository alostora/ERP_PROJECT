<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('employees.title') })"
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
        <div class="col-12">
          <div class="form-group">
            <Select
              v-model="formData.branch_id"
              :options="branches"
              :optionLabel="branchLabel"
              optionValue="id"
              :placeholder="$t('employees.branch')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
              @change="onBranchChange"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group" v-if="this.formData.branch_id && warehouses.length">
            <Select
              v-model="formData.warehouse_id"
              :options="warehouses"
              :optionLabel="warehouseLabel"
              optionValue="id"
              :placeholder="$t('employees.warehouse')"
              :filter="true"
              :showClear="true"
              :filterPlaceholder="$t('common.search')"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="name" v-model="formData.name" autocomplete="on" class="w-full" />
              <label for="name">{{ $t('employees.name') }}</label>
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
              <label for="email">{{ $t('employees.email') }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
        </div>

        <div class="col-6">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputText id="phone" v-model="formData.phone" autocomplete="on" class="w-full" />
              <label for="phone">{{ $t('employees.phone') }}</label>
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
              <label for="password">{{ $t('employees.password') }}</label>
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
              <label for="password_confirmation">{{ $t('employees.confirmPassword') }}</label>
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
              <label for="address">{{ $t('employees.address') }}</label>
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
          {{ formLoading ? $t('common.loading') : $t('common.create') }}
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

  props: {
    company_id: {
      type: String,
      required: false,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
  },
  data() {
    return {
      apiUrl: API_ROUTES.EMPLOYEE.BASE,
      formData: {
        company_id: this.company_id,
        branch_id: '',
        warehouse_id: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        address: '',
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

    warehouseLabel() {
      return this.currentLanguage === 'ar' ? 'name_ar' : 'name'
    },
  },

  methods: {
    async onBranchChange() {
      await this.loadWarehouses(this.company_id, this.formData.branch_id)

      this.formData.warehouse_id = ''
    },

    openModal() {
      this.openFormModal()
      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.loadBranches(this.formData.company_id)
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
