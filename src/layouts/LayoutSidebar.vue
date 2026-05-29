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
import SidebarItem from "./SidebarItem.vue";

export default {
  name: "LayoutSidebar",
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
};
</script>

<style scoped>
/* All styles moved to SidebarItem.vue or sidebar.css */
.app-sidebar {
  position: fixed;
  top: 64px;
  left: 0;
  width: 280px;
  height: calc(100vh - 64px);
  background: var(--surface-card);
  border-right: 1px solid var(--border-color);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;
  z-index: 99;
}

.app-sidebar.collapsed {
  width: 72px;
}

.rtl-sidebar {
  left: auto;
  right: 0;
  border-right: none;
  border-left: 1px solid var(--border-color);
}

.sidebar-nav {
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.collapsed .nav-label {
  display: none;
}

.collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem;
}

.collapsed .nav-arrow {
  display: none;
}

.collapsed .nav-group-items {
  display: none;
}

@media (max-width: 768px) {
  .app-sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .rtl-sidebar {
    transform: translateX(100%);
  }

  .app-sidebar:not(.collapsed) {
    transform: translateX(0);
    width: 280px;
  }
}
</style>
