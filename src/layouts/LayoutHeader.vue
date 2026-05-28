<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-left">
        <button class="menu-toggle" @click="$emit('toggle-sidebar')">☰</button>
        <h1 class="logo">ERP System</h1>
      </div>

      <div class="header-right">
        <button class="theme-toggle" @click="toggleTheme">🌓</button>
        <button class="language-toggle" @click="toggleLanguage">🌐</button>
        <button class="logout-btn" @click="logout">🚪 {{ $t('common.menu.logout') }}</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',

  emits: ['toggle-sidebar', 'theme-changed', 'language-changed'],

  data() {
    return {
      currentTheme: localStorage.getItem('theme') || 'light',
      currentLanguage: localStorage.getItem('language') || 'en',
    }
  },

  methods: {
    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light'
      this.currentTheme = newTheme
      localStorage.setItem('theme', newTheme)
      this.$emit('theme-changed', newTheme)
    },

    toggleLanguage() {
      const newLang = this.currentLanguage === 'en' ? 'ar' : 'en'
      this.currentLanguage = newLang
      localStorage.setItem('language', newLang)
      this.$emit('language-changed', {
        code: newLang,
        dir: newLang === 'ar' ? 'rtl' : 'ltr',
      })
      window.location.reload()
    },

    logout() {
      if (
        confirm(this.$t('common.confirmDeleteMessage', { itemName: this.$t('common.menu.logout') }))
      ) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style scoped>
.app-header {
  height: 64px;
  background: var(--surface-card);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1.25rem;
  background: transparent;
  border: none;
}

.menu-toggle:hover {
  background: var(--surface-hover);
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle,
.language-toggle {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1.25rem;
  background: transparent;
  border: none;
}

.theme-toggle:hover,
.language-toggle:hover {
  background: var(--surface-hover);
}

.logout-btn {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  background: transparent;
  border: none;
  color: var(--color-danger);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
  }
}
</style>
