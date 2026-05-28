<template>
  <footer class="app-footer">
    <div class="footer-content">
      <span>© 2024 ERP System. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LayoutFooter',
}
</script>

<style scoped>
.app-footer {
  background: var(--surface-card);
  border-top: 1px solid var(--border-color);
  padding: 1rem 1.5rem;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.sidebar-collapsed .app-footer {
  margin-left: 72px;
}

.footer-content {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

@media (max-width: 768px) {
  .app-footer {
    margin-left: 0;
  }
}
</style>
