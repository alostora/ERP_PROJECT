<template>
  <Dialog
    v-model:visible="formVisible"
    :header="$t('common.createTitle', { module: $t('purchasesInvoices.title') })"
    modal
    :style="{ width: '50vw', height: '30vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="closeFormModal"
  >
    <div class="card flex justify-center">
      <Stepper :value="activeStep" class="basis-[50rem]">
        <StepList>
          <Step v-for="stage in stages" :key="stage" :value="String(stage.stage_sort)">
            {{ $t('purchasesInvoices.stage') }}
            {{ currentLanguage == 'ar' ? stage.name_ar : stage.name }}
          </Step>
        </StepList>
        <StepPanels>
          <StepPanel
            v-for="stage in stages"
            :key="stage.stage_sort"
            v-slot="{ activateCallback }"
            :value="String(stage.stage_sort)"
            class="border rounded"
          >
            <Card>
              <template #title>
                <div class="border rounded bg-info-100 p-1">
                  {{ currentLanguage == 'ar' ? stage.name_ar : stage.name }}
                </div>
              </template>
              <template #content>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group">
                    <label class="form-label">{{ $t('purchasesInvoices.stage_comment') }}</label>
                    <textarea
                      v-model="formData.address"
                      class="textarea"
                      rows="3"
                      :placeholder="$t('common.add') + ' ' + $t('purchasesInvoices.stage_comment')"
                    ></textarea>
                  </div>
                  <div class="flex gap-4">
                    <Button
                      v-if="stage.stage_sort > minStageSort"
                      :label="$t('common.back')"
                      severity="warn"
                      type="button"
                      class="ml-1 mr-1 mb-3"
                      :icon="currentLanguage == 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'"
                      @click="activateCallback(String(stage.stage_sort - 1))"
                    />
                    <Button
                      v-if="stage.stage_sort < maxStageSort"
                      :label="$t('common.next')"
                      severity="success"
                      type="button"
                      class="ml-1 mr-1 mb-3"
                      :icon="currentLanguage == 'ar' ? 'pi pi-arrow-left' : 'pi pi-arrow-right'"
                      iconPos="right"
                      @click="activateCallback(String(stage.stage_sort + 1))"
                    />
                  </div>
                </form>
              </template>
            </Card>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </Dialog>
</template>

<script>
import { API_ROUTES } from '@/constants/apiRoutes'
import customFunctions from '../custom_functions/customFunctions'
import formMixin from '@/mixins/form'
import validationRequest from '../validation/validationRequest'

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Card from 'primevue/card'

export default {
  name: 'UpdateStageForm',

  mixins: [formMixin, customFunctions, validationRequest],

  components: {
    Dialog,
    Button,
    Stepper,
    StepList,
    StepPanels,
    Step,
    StepPanel,
    StepPanel,
    Card,
  },

  watch: {
    '$route.params.company_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.company_id = newVal
        }
      },
      immediate: true,
    },

    '$route.params.branch_id': {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.branch_id = newVal
        }
      },
      immediate: true,
    },
    invoice_id: {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          this.formData.invoice_id = newVal
        }
      },
      immediate: true,
    },
    activeStep: {
      handler(newVal) {
        if (newVal && newVal !== 'undefined') {
          console.log('activeStep', newVal)
        }
      },
      immediate: true,
    },
  },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    branch_id: {
      type: String,
      required: false,
    },
    invoice_id: {
      type: String,
      required: false,
    },
  },

  computed: {
    currentLanguage() {
      return localStorage.getItem('language') || 'en'
    },
    maxStageSort() {
      if (!this.stages || !this.stages.length) return 0
      return Math.max(...this.stages.map((s) => s.stage_sort))
    },
    minStageSort() {
      if (!this.stages || !this.stages.length) return 0
      return Math.min(...this.stages.map((s) => s.stage_sort))
    },
  },

  data() {
    return {
      apiUrl: API_ROUTES.PURCHASES_INVOICE.UPDATE_STAGE,
      activeStep: '1',
      formData: {
        company_id: this.company_id,
        branch_id: this.branch_id,
        invoice_id: this.invoice_id,
        stage_id: '',
        comment: '',
      },
    }
  },

  methods: {
    openModal() {
      this.openFormModal()

      this.formData.company_id = this.company_id || this.$route.params.company_id
      this.formData.branch_id = this.branch_id || this.$route.params.branch_id
      this.formData.invoice_id = this.invoice_id || this.$route.params.invoice_id

      this.loadStages(this.formData.company_id)
    },

    goToStep(step) {
      this.activeStep = String(step)
    },

    goToStage(stage) {
      console.log('hosaaaaam', stage)
      this.activeStep = String(stage.stage_sort)
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
