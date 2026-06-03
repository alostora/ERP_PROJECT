<template>
  <div class="card">
    <Tabs :value="activeTab">
      <TabList>
        <Tab value="addresses">
          <router-link
            :to="{
              name: 'contact-addresses',
              params: { company_id: company_id, contact_id: contact_id },
            }"
          >
            {{ $t('contacts.addresses') }}
          </router-link>
        </Tab>
        <Tab value="emails">
          <router-link
            :to="{
              name: 'contact-emails',
              params: { company_id: company_id, contact_id: contact_id },
            }"
          >
            {{ $t('contacts.emails') }}
          </router-link>
        </Tab>
        <Tab value="phones">
          <router-link
            :to="{
              name: 'contact-phones',
              params: { company_id: company_id, contact_id: contact_id },
            }"
          >
            {{ $t('contacts.phones') }}
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
    contact_id: {
      type: String,
      required: false,
    },
  },

  computed: {
    activeTab() {
      const name = this.$route.name
      if (name === 'contact-addresses') return 'addresses'
      if (name === 'contact-emails') return 'emails'
      if (name === 'contact-phones') return 'phones'
      return 'addresses'
    },
  },
  mounted() {
    if (this.$route.name === 'related-models') {
      this.$router.push({
        name: 'contact-addresses',
        params: { company_id: this.company_id, contact_id: this.contact_id },
      })
    }
  },
}
</script>
