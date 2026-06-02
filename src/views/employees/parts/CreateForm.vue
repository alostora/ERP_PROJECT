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

      <div class="form-group">
        <label class="form-label required">{{ $t('employees.branch') }}</label>
        <div class="col-12">
          <Select
            v-model="formData.branch_id"
            :options="branches"
            :optionLabel="branchLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('employees.branch')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
            @change="onBranchChange"
          />
        </div>
      </div>

      <div class="form-group" v-if="this.formData.branch_id && warehouses.length">
        <label class="form-label required">{{ $t('employees.warehouse') }}</label>
        <div class="col-12">
          <Select
            v-model="formData.warehouse_id"
            :options="warehouses"
            :optionLabel="warehouseLabel"
            optionValue="id"
            :placeholder="$t('common.all') + ' ' + $t('employees.warehouse')"
            :filter="true"
            :showClear="true"
            :filterPlaceholder="$t('common.search')"
            class="w-full"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('employees.name') }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="input"
          :class="{ 'input-error': errors.name }"
        />
        <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('employees.email') }}</label>
        <input
          v-model="formData.email"
          type="email"
          class="input"
          :class="{ 'input-error': errors.email }"
        />
        <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('employees.phone') }}</label>
        <input v-model="formData.phone" type="text" class="input" />
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('employees.password') }}</label>
        <input
          v-model="formData.password"
          type="password"
          class="input"
          :class="{ 'input-error': errors.password }"
        />
        <small v-if="errors.password" class="error-message">{{ errors.password }}</small>
      </div>

      <div class="form-group">
        <label class="form-label required">{{ $t('employees.confirmPassword') }}</label>
        <input v-model="formData.password_confirmation" type="password" class="input" />
        <small v-if="errors.password_confirmation" class="error-message">{{
          errors.password_confirmation
        }}</small>
      </div>

      <div class="form-group">
        <label class="form-label">{{ $t('employees.address') }}</label>
        <textarea v-model="formData.address" class="textarea" rows="3"></textarea>
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
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'
import customFunctions from '../custom_functions/customFunctions'
import Select from 'primevue/select'

export default {
  name: 'CreateForm',
  mixins: [formMixin, customFunctions, validationRequest],
  components: { Dialog, Select },

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
      await this.loadWarehouses(this.formData.branch_id)

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
