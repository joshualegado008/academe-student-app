<template>
  <!-- COMPONENT: HeaderComponent -->
  <!-- Receives: studentCount (prop) -->
  <!-- Emits: none (uses RouterLink for navigation) -->
  <header class="site-header">
    <div class="header-brand">
      <span class="brand-name">Academe</span>
      <span class="brand-tag">v2.0</span>
    </div>

    <nav class="nav-links" aria-label="Main navigation">
      <RouterLink
        :to="{ name: 'home' }"
        class="nav-btn"
        active-class="nav-btn--active"
        exact-active-class="nav-btn--active"
      >
        Home
      </RouterLink>

      <RouterLink
        :to="{ name: 'students' }"
        class="nav-btn"
        active-class="nav-btn--active"
      >
        Students
        <span v-if="studentCount > 0" class="nav-count">{{ studentCount }}</span>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
/**
 * HeaderComponent
 * Displays the app logo and navigation links.
 * Navigation is handled by Vue Router's <RouterLink>.
 */
defineProps({
  /** Total number of students — shown as a badge on the Students link */
  studentCount: {
    type:    Number,
    default: 0,
  },
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ink);
  border-bottom: 2px solid var(--accent);
  height: 68px;
  padding: 0 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.header-brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.brand-name {
  font-family: var(--serif);
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--paper);
  font-weight: 600;
}
.brand-tag {
  font-family: var(--mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  background: rgba(191, 53, 23, 0.18);
  padding: 2px 7px;
  border-radius: 2px;
}

/* Nav */
.nav-links {
  display: flex;
  gap: 4px;
}
.nav-btn {
  font-family: var(--mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #a09880;
  padding: 8px 18px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  text-decoration: none;
  transition: all 0.18s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav-btn:hover {
  color: var(--paper);
  border-color: #2e2e2e;
  background: #1c1c1c;
}
.nav-btn--active {
  color: var(--paper);
  background: var(--accent);
  border-color: var(--accent);
}
.nav-count {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 0.62rem;
  padding: 1px 7px;
  border-radius: 10px;
  font-family: var(--mono);
}
.nav-btn--active .nav-count {
  background: rgba(255,255,255,0.25);
}

@media (max-width: 600px) {
  .site-header { padding: 0 20px; }
  .brand-name  { font-size: 1.2rem; }
}
</style>