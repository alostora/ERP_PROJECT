<template>
  <div class="card">
    <Tabs :value="activeTab">
      <TabList>
        <Tab value="branches">
          <router-link
            :to="{
              name: 'discount-branches',
              params: { company_id: company_id, discount_id: discount_id },
            }"
          >
            {{ $t('discounts.branches') }}
          </router-link>
        </Tab>
        <Tab value="final-products">
          <router-link
            :to="{
              name: 'discount-final-products',
              params: { company_id: company_id, discount_id: discount_id },
            }"
          >
            {{ $t('discounts.final_products') }}
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
      required: false,
    },
    discount_id: {
      type: String,
      required: false,
    },
  },

  computed: {
    activeTab() {
      const name = this.$route.name
      if (name === 'discount-branches') return 'branches'
      if (name === 'discount-final-products') return 'final-products'
      return 'branches'
    },
  },
  mounted() {
    if (this.$route.name === 'related-models') {
      this.$router.push({
        name: 'discount-branches',
        params: { company_id: this.company_id, discount_id: this.discount_id },
      })
    }
  },
}
</script>
