<template>
  <!-- VIEW: HomeView — Route: / -->
  <main class="page anim-fade-up">

    <!-- Hero section -->
    <section class="hero">
      <div class="hero-left">
        <div class="hero-badge">Academic Management System</div>

        <h1 class="hero-headline">
          Manage your<br />
          <em>students</em><br />
          with clarity.
        </h1>

        <p class="hero-body">
          Academe gives faculty and administrators a clean, fast workspace
          to track student enrollment, academic standing, and course progress —
          all in one place.
        </p>

        <div class="cta-row">
          <!-- RouterLink navigation to students page -->
          <RouterLink :to="{ name: 'students' }" class="btn btn-primary">
            View Students →
          </RouterLink>
          <RouterLink :to="{ name: 'students' }" class="btn btn-outline">
            Add New
          </RouterLink>
        </div>
      </div>

      <div class="hero-right" aria-hidden="true">
        <div class="stat-card stat-card--dark">
          <div class="stat-number">3,<span class="stat-accent">841</span></div>
          <div class="stat-label">Total enrolled students</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">24</div>
          <div class="stat-label">Departments</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">3.68</div>
          <div class="stat-label">Avg. GPA this semester</div>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <!-- Feature strip -->
    <section class="features" aria-label="Key features">
      <div
        v-for="(feature, i) in features"
        :key="feature.title"
        class="feature-item anim-fade-up"
        :style="{ animationDelay: `${i * 80}ms` }"
      >
        <div class="feature-icon" aria-hidden="true">{{ feature.icon }}</div>
        <h2 class="feature-name">{{ feature.title }}</h2>
        <p class="feature-desc">{{ feature.desc }}</p>
      </div>
    </section>

  </main>
</template>

<script setup>
/**
 * VIEW — HomeView
 * Route: /
 * Displays the landing page with hero section and features.
 * No direct data logic — navigation is handled by Vue Router.
 */

const features = [
  {
    icon:  '📋',
    title: 'Student Registry',
    desc:  'Browse, search, and filter the full roster. Add or remove students in real time with reactive state management.',
  },
  {
    icon:  '🌐',
    title: 'Live API Data',
    desc:  'Fetch live contact data from external sources. Loading and error states are handled gracefully by the controller.',
  },
  {
    icon:  '📊',
    title: 'Academic Tracking',
    desc:  'See GPA, year level, and enrollment date at a glance. All data flows through a clean MVC architecture.',
  },
]
</script>

<style scoped>
.page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 56px 44px 80px;
}

/* ── Hero ──────────────────────────────────────────── */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  padding-bottom: 56px;
}

.hero-badge {
  display: inline-block;
  font-family: var(--mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--border);
  padding: 4px 12px;
  border-radius: 2px;
  margin-bottom: 22px;
}

.hero-headline {
  font-family: var(--serif);
  font-size: 4rem;
  letter-spacing: -0.04em;
  line-height: 1.0;
  margin-bottom: 24px;
  font-weight: 600;
}
.hero-headline em {
  color: var(--accent);
  font-style: italic;
}

.hero-body {
  font-size: 1.02rem;
  color: var(--muted);
  line-height: 1.72;
  font-weight: 300;
  margin-bottom: 36px;
  max-width: 400px;
}

.cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Stat cards */
.hero-right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 22px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.stat-card--dark {
  grid-column: span 2;
  background: var(--ink);
  border-color: var(--ink);
}
.stat-card--dark .stat-number { color: var(--paper); }
.stat-card--dark .stat-label  { color: #666; }

.stat-number {
  font-family: var(--serif);
  font-size: 2.3rem;
  line-height: 1;
  margin-bottom: 5px;
  color: var(--ink);
}
.stat-accent { color: var(--accent); }
.stat-label {
  font-family: var(--mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

/* ── Features ──────────────────────────────────────── */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.feature-icon {
  font-size: 1.6rem;
  margin-bottom: 12px;
}
.feature-name {
  font-family: var(--serif);
  font-size: 1.15rem;
  margin-bottom: 8px;
  font-weight: 400;
}
.feature-desc {
  font-size: 0.87rem;
  color: var(--muted);
  line-height: 1.65;
  font-weight: 300;
}

/* ── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
  .page         { padding: 36px 20px 60px; }
  .hero         { grid-template-columns: 1fr; gap: 40px; }
  .hero-headline { font-size: 2.8rem; }
  .hero-right   { display: none; }
  .features     { grid-template-columns: 1fr; }
}
</style>