<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2>ERP System</h2>
          <p>Sign in to your account</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">Email / Username</label>
            <input
              type="text"
              v-model="form.user"
              class="input"
              :class="{ 'input-error': errors.user }"
              placeholder="Enter your email or username"
            />
            <div v-if="errors.user" class="error-message">{{ errors.user }}</div>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              type="password"
              v-model="form.password"
              class="input"
              :class="{ 'input-error': errors.password }"
              placeholder="Enter your password"
            />
            <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            {{ loading ? 'Loading...' : 'Sign In' }}
          </button>

          <div v-if="errors.general" class="error-message text-center mt-3">
            {{ errors.general }}
          </div>
        </form>

        <div class="login-footer">
          <button class="theme-toggle" @click="toggleTheme">
            {{ currentTheme === 'dark' ? '☀️' : '🌙' }} Theme
          </button>
          <button class="language-toggle" @click="toggleLanguage">🌐 Language</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/mixins/api'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        user: '',
        password: '',
      },
      errors: {},
      loading: false,
      currentTheme: localStorage.getItem('theme') || 'light',
    }
  },
  methods: {
    async handleLogin() {
      this.errors = {}

      if (!this.form.user) {
        this.errors.user = 'Email or username is required'
        return
      }
      if (!this.form.password) {
        this.errors.password = 'Password is required'
        return
      }

      this.loading = true

      try {
        const response = await API.post('/auth/login', {
          user: this.form.user,
          password: this.form.password,
        })

        if (response.data.status_code === 200 && response.data.data.token) {
          localStorage.setItem('authToken', response.data.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.data))

          this.$toast.add({
            severity: 'success',
            summary: 'Welcome Back!',
            detail: `Hello ${response.data.data.name}`,
            life: 3000,
          })

          this.$router.push('/')
        }
      } catch (error) {
        if (error.response?.status === 401) {
          this.errors.general = 'Invalid email or password'
        } else {
          this.errors.general = error.response?.data?.message || 'Login failed'
        }
      } finally {
        this.loading = false
      }
    },

    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light'
      this.currentTheme = newTheme
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.remove('light-mode', 'dark-mode')
      document.documentElement.classList.add(`${newTheme}-mode`)
    },

    toggleLanguage() {
      const currentLang = localStorage.getItem('language') || 'en'
      const newLang = currentLang === 'en' ? 'ar' : 'en'
      localStorage.setItem('language', newLang)
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = newLang
      window.location.reload()
    },
  },

  mounted() {
    document.documentElement.classList.add(`${this.currentTheme}-mode`)

    const savedLang = localStorage.getItem('language') || 'en'
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLang
  },
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-ground);
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

.login-card {
  background: var(--surface-card);
  border-radius: var(--radius-xl);
  padding: 2rem;
  border: 1px solid var(--border-color);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--text-color-secondary);
}

.btn-block {
  width: 100%;
  margin-top: 1rem;
}

.login-footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.theme-toggle,
.language-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-color-secondary);
  cursor: pointer;
}

.theme-toggle:hover,
.language-toggle:hover {
  background: var(--surface-hover);
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: var(--spacing-3);
}
</style>
