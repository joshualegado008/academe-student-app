<template>
  <div id="app-root">
    <HeaderComponent :student-count="studentCount" />

    <!-- Removed <Transition> wrapper — was causing blank page flashes -->
    <RouterView />

    <footer class="site-footer">
      <span class="footer-copy">
        Academe Student Info App &mdash; Built with
        <span class="footer-accent">Vue 3</span> + MVC Architecture &copy; {{ year }}
      </span>
    </footer>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import { studentCount } from '@/services/studentService.js'

const year = new Date().getFullYear()
</script>

<style>
/* Page transition removed — was causing blank flashes on navigation */
</style>

<style scoped>
#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-footer {
  background: var(--ink);
  color: #4a4a4a;
  text-align: center;
  padding: 20px 40px;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border-top: 2px solid #1a1a1a;
  margin-top: auto;
}
.footer-accent {
  color: var(--accent);
}
</style>
