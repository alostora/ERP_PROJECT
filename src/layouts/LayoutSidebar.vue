<template>
  <aside class="app-sidebar" :class="{ collapsed: collapsed, 'rtl-sidebar': isRtl }">
    <nav class="sidebar-nav">
      <SidebarItem
        v-for="item in sidebarItems"
        :key="item.label || item.path"
        :item="item"
        :level="0"
        :collapsed="collapsed"
        :is-rtl="isRtl"
      />
    </nav>
  </aside>
</template>

<script>
import SidebarItem from './SidebarItem.vue'

export default {
  name: 'LayoutSidebar',
  components: { SidebarItem },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    sidebarItems: {
      type: Array,
      default: () => [],
    },
    isRtl: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
