<template>
  <div class="">
    <Tabs :value="activeTab">
      <TabList>
        <Tab value="addresses">
          <router-link
            :to="{
              name: 'stage-related-models',
              params: { company_id: company_id, stage_id: stage_id },
            }"
          >
            {{ $t('stages.employees') }}
          </router-link>
        </Tab>
      </TabList>
    </Tabs>

    <!-- Content displays here when route changes -->
    <div class="mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'

export default {
  name: 'RelatedModels',
  components: { Tabs, TabList, Tab },

  props: {
    company_id: {
      type: String,
      required: true,
    },
    stage_id: {
      type: String,
      required: true,
    },
  },

  computed: {
    activeTab() {
      return 'employees'
    },
  },
  mounted() {
    this.$router.push({
      name: 'stage-employees',
      params: { company_id: this.company_id, stage_id: this.stage_id },
    })
  },
}
</script>
