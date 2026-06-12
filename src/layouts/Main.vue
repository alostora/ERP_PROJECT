<template>
  <div class="app-layout" :class="{ rtl: isRtl }">
    <LayoutHeader
      @toggle-sidebar="toggleSidebar"
      @theme-changed="onThemeChanged"
      @language-changed="onLanguageChanged"
    />

    <LayoutSidebar :collapsed="sidebarCollapsed" :sidebar-items="sidebar_items" :is-rtl="isRtl" />

    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import LayoutHeader from './LayoutHeader.vue'
import LayoutSidebar from './LayoutSidebar.vue'
import { sidebarItems } from '@/constants/sidebarItems'

export default {
  name: 'MainLayout',

  mixins: [sidebarItems],
  components: {
    LayoutHeader,
    LayoutSidebar,
  },
  data() {
    return {
      sidebarCollapsed: false,
      isRtl: localStorage.getItem('language') === 'ar',
    }
  },

  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    onThemeChanged(theme) {
      document.documentElement.classList.remove('light-mode', 'dark-mode')
      document.documentElement.classList.add(`${theme}-mode`)
    },
    onLanguageChanged(language) {
      this.isRtl = language.dir === 'rtl'
      document.documentElement.dir = language.dir
      document.documentElement.lang = language.code
    },
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.documentElement.classList.add(`${savedTheme}-mode`)

    const savedLang = localStorage.getItem('language') || 'en'
    this.isRtl = savedLang === 'ar'
    document.documentElement.dir = this.isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLang
  },
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  background: var(--surface-ground);
  min-height: calc(100vh - 64px);
}

.main-content.sidebar-collapsed {
  margin-left: 72px;
}

/* RTL */
.rtl .main-content {
  margin-left: 0;
  margin-right: 280px;
}

.rtl .main-content.sidebar-collapsed {
  margin-right: 72px;
}

.content-wrapper {
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  .rtl .main-content {
    margin-right: 0;
  }

  .main-content.sidebar-collapsed {
    margin-left: 0;
  }

  .rtl .main-content.sidebar-collapsed {
    margin-right: 0;
  }
}
</style>
