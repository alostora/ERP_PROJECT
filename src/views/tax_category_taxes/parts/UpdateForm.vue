<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.updateTitle', { module: $t('taxCategoryTaxes.title') })"
    :modal="true"
    :style="{ width: '450px' }"
    @hide="closeFormModal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-12">
          <div class="form-group">
            <FloatLabel variant="on">
              <InputNumber
                id="fixed_amount_override"
                v-model="formData.fixed_amount_override"
                autocomplete="on"
                class="w-full"
              />
              <label for="fixed_amount_override">{{
                $t('taxCategoryTaxes.fixedAmountOverride')
              }}</label>
            </FloatLabel>
          </div>
          <small v-if="errors.fixed_amount_override" class="error-message">
            {{ errors.fixed_amount_override }}
          </small>
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
import Dialog from 'primevue/dialog'
import formMixin from '@/mixins/form'
import { API_ROUTES } from '@/constants/apiRoutes'
import validationRequest from '../validation/validationRequest'

export default {
  name: 'UpdateForm',
  mixins: [formMixin, validationRequest],
  components: { Dialog },

  props: {
    tax_category_id: {
      type: String,
      required: true,
    },
    tax_id: {
      type: String,
      required: false,
    },
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
        if (selectedItem && selectedItem.tax) {
          this.populateForm(selectedItem)
        }
      },
    },
  },

  data() {
    return {
      apiUrl: `${API_ROUTES.TAX_CATEGORY_TAX.UPDATE}`,
      formData: {
        fixed_amount_override: null,
      },
    }
  },

  methods: {
    openModal() {
      this.formVisible = true
    },

    populateForm(selectedItem) {
      this.formData = {
        fixed_amount_override: selectedItem.fixed_amount_override || null,
      }
      this.errors = {}
    },

    async handleSubmit() {
      if (!this.validateUpdateForm(this.formData)) {
        return
      }

      const data = { ...this.formData }

      const taxCategoryTaxId = this.tax_category_id + '/' + this.tax_id

      await this.submitUpdateForm(
        this.apiUrl,
        taxCategoryTaxId,
        data,
        this.$t('common.updatedSuccessfully')
      )
    },
  },
}
</script>
