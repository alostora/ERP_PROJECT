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
        confirm(
          this.$t('common.confirmDeleteMessage', {
            itemName: this.$t('common.menu.logout'),
          })
        )
      ) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        this.$router.push('/login')
      }
    },
  },
}
</script>
