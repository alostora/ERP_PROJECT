<template>
  <aside class="app-sidebar" :class="{ collapsed: collapsed, 'rtl-sidebar': isRtl }">
    <nav class="sidebar-nav">
      <router-link
        v-for="item in sidebarItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        active-class="active"
      >
        <i :class="item.icon" class="nav-icon"></i>
        <span v-if="!collapsed" class="nav-label">{{ $t(item.label) }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'LayoutSidebar',
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

<style scoped>
.app-sidebar {
  position: fixed;
  top: 64px;
  left: 0;
  width: 280px;
  height: calc(100vh - 64px);
  background: var(--surface-card);
  border-right: 1px solid var(--border-color);
  transition: all 0.3s ease;
  overflow-x: hidden;
  z-index: 99;
}

.app-sidebar.collapsed {
  width: 72px;
}

/* RTL Sidebar */
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

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-color-secondary);
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: var(--surface-hover);
  color: var(--text-color);
}

.nav-item.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.nav-icon {
  font-size: 1.125rem;
  min-width: 1.5rem;
}

.nav-label {
  font-size: 0.875rem;
  white-space: nowrap;
}

.collapsed .nav-label {
  display: none;
}

.collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem;
}

@media (max-width: 768px) {
  .app-sidebar {
    transform: translateX(-100%);
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
