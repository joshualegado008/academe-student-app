<template>
  <!-- VIEW: StudentsView — Route: /students -->
  <main class="page anim-fade-up">

    <!-- ── Add Student Form ────────────────────────────────────────────── -->
    <section class="add-section" aria-label="Add new student">
      <div class="form-header">
        <h2 class="form-title">Add Student</h2>
        <span class="form-subtitle">New Enrollment</span>
      </div>

      <div class="form-grid">
        <div class="form-field">
          <label class="form-label" for="name">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            class="form-input"
            :class="{ 'form-input--error': formError }"
            type="text"
            placeholder="e.g. Maria Santos"
            @keydown.enter="submitAddStudent"
          />
        </div>

        <div class="form-field">
          <label class="form-label" for="course">Course / Program</label>
          <select id="course" v-model="form.course" class="form-select">
            <option v-for="c in COURSES" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label" for="year">Year Level</label>
          <select id="year" v-model="form.year" class="form-select">
            <option v-for="y in YEAR_LEVELS" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <!-- Event handler: enroll student -->
        <button class="btn btn-accent" @click="submitAddStudent">
          + Enroll Student
        </button>
        <button class="btn btn-ghost" @click="resetForm">
          Reset
        </button>
        <Transition name="msg">
          <span v-if="successMsg" class="success-msg" role="status">{{ successMsg }}</span>
        </Transition>
        <Transition name="msg">
          <span v-if="formError" class="error-inline" role="alert">{{ formError }}</span>
        </Transition>
      </div>
    </section>

    <!-- ── Student Registry ────────────────────────────────────────────── -->
    <section class="registry-section" aria-label="Student registry">

      <div class="registry-header">
        <div>
          <p class="eyebrow">Registry</p>
          <h2 class="section-title">All Students</h2>
          <p class="section-sub">
            Showing <strong>{{ filteredStudents.length }}</strong>
            of <strong>{{ studentCount }}</strong> records
          </p>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar" role="search">
        <input
          v-model="search"
          class="search-input"
          type="search"
          placeholder="Search by name, course, or ID…"
          aria-label="Search students"
        />
        <!-- Year filter buttons (event handlers) -->
        <div class="filter-group" role="group" aria-label="Filter by year">
          <button
            v-for="y in ['All', ...YEAR_LEVELS]"
            :key="y"
            class="filter-btn"
            :class="{ 'filter-btn--active': yearFilter === y }"
            @click="setYearFilter(y)"
          >
            {{ y }}
          </button>
        </div>
      </div>

      <!-- Student grid -->
      <TransitionGroup name="cards" tag="div" class="students-grid">
        <StudentComponent
          v-for="student in filteredStudents"
          :key="student.id"
          :student="student"
          @remove="deleteStudent"
        />
      </TransitionGroup>

      <!-- Empty state -->
      <div v-if="filteredStudents.length === 0" class="empty-state">
        <span class="empty-icon">🔍</span>
        <p>No students match your current filters.</p>
      </div>

    </section>

    <hr class="divider" />

    <!-- ── API Section (Part D) ────────────────────────────────────────── -->
    <section class="api-section" aria-label="External contacts from API">

      <div class="api-header">
        <div>
          <div class="api-source-tag">JSONPlaceholder API</div>
          <h2 class="section-title">External Contacts</h2>
          <p class="section-sub">
            Fetch live user data from a public REST API.
          </p>
        </div>

        <!-- Event handler: fetch from API -->
        <button
          class="btn btn-primary"
          :disabled="loading"
          @click="loadUsers"
        >
          <span v-if="loading" class="spinner" aria-hidden="true" />
          {{ loading ? 'Fetching…' : '↓ Fetch Users' }}
        </button>
      </div>

      <!-- Loading state (Part D) -->
      <div v-if="loading" class="loading-state" aria-live="polite" aria-busy="true">
        <div class="spinner spinner--lg" />
        <p class="loading-text">Contacting API endpoint…</p>
      </div>

      <!-- Error state (Part D) -->
      <div v-else-if="error" class="error-state" role="alert">
        <span class="error-icon" aria-hidden="true">⚠️</span>
        <div class="error-content">
          <p class="error-title">Request Failed</p>
          <p class="error-msg">{{ error }}</p>
          <p class="error-msg">Please check your connection and try again.</p>
          <button class="btn btn-accent" style="margin-top: 12px;" @click="loadUsers">
            Retry Request
          </button>
        </div>
      </div>

      <!-- Results list (Part D) -->
      <template v-else-if="users.length > 0">
        <ul class="user-list" aria-label="Fetched users">
          <li
            v-for="(user, i) in users"
            :key="user.id"
            class="user-row anim-slide-in"
            :style="{ animationDelay: `${i * 45}ms` }"
          >
            <span class="user-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="user-info">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-email">{{ user.email }}</span>
            </div>
            <div class="user-meta">
              <span class="user-company">{{ user.company }}</span>
              <span class="user-city">{{ user.city }}</span>
            </div>
          </li>
        </ul>
        <p class="api-count">{{ users.length }} records retrieved from JSONPlaceholder</p>
      </template>

      <!-- Idle state -->
      <div v-else-if="!fetched" class="idle-state">
        <div class="idle-icon" aria-hidden="true">📡</div>
        <p>Click "Fetch Users" to load data from the API.</p>
      </div>

    </section>

  </main>
</template>

<script setup>
/**
 * VIEW — StudentsView
 * Route: /students
 *
 * This view delegates ALL business logic to controllers.
 * It only handles template rendering and forwards events.
 */
import { useStudentController } from '@/controllers/studentController.js'
import { useApiController }     from '@/controllers/apiController.js'
import StudentComponent          from '@/components/StudentComponent.vue'

// ── Student controller (MVC: View calls Controller) ──────────────────────────
const {
  search,
  yearFilter,
  filteredStudents,
  studentCount,
  form,
  formError,
  successMsg,
  COURSES,
  YEAR_LEVELS,
  submitAddStudent,
  deleteStudent,
  resetForm,
  setYearFilter,
} = useStudentController()

// ── API controller ────────────────────────────────────────────────────────────
const {
  users,
  loading,
  error,
  fetched,
  loadUsers,
} = useApiController()
</script>

<style scoped>
.page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 52px 44px 80px;
}

/* ── Add Student Form ──────────────────────────────── */
.add-section {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px;
  margin-bottom: 52px;
}
.form-header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 22px;
}
.form-title {
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 400;
}
.form-subtitle {
  font-family: var(--mono);
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 3px 9px;
  border-radius: 2px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-label {
  font-family: var(--mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}
.form-input,
.form-select {
  font-family: var(--sans);
  font-size: 0.9rem;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--paper);
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus,
.form-select:focus   { border-color: var(--ink); }
.form-input--error   { border-color: var(--accent); }

.form-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.success-msg {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: #2e7d32;
  letter-spacing: 0.04em;
}
.error-inline {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--accent);
}

/* ── Registry ──────────────────────────────────────── */
.registry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  align-items: center;
}
.search-input {
  flex: 1;
  min-width: 200px;
  font-family: var(--sans);
  font-size: 0.9rem;
  padding: 10px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card-bg);
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus { border-color: var(--ink); }

.filter-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-btn {
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 9px 15px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card-bg);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.filter-btn:hover         { color: var(--ink); border-color: var(--muted); }
.filter-btn--active       { background: var(--ink); color: var(--paper); border-color: var(--ink); }

.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 300;
}
.empty-icon { font-size: 2rem; display: block; margin-bottom: 12px; }

/* ── API Section ───────────────────────────────────── */
.api-section { margin-top: 4px; }

.api-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}
.api-source-tag {
  font-family: var(--mono);
  font-size: 0.63rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  border: 1px solid var(--border);
  padding: 3px 9px;
  border-radius: 2px;
  margin-bottom: 8px;
  display: inline-block;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  gap: 18px;
}
.loading-text {
  font-family: var(--mono);
  font-size: 0.74rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
  flex-shrink: 0;
}
.spinner--lg {
  width: 38px;
  height: 38px;
  border-color: var(--border);
  border-top-color: var(--ink);
  border-width: 2px;
}

/* Error */
.error-state {
  background: #fff5f4;
  border: 1px solid #f5c4be;
  border-left: 4px solid var(--accent);
  border-radius: 6px;
  padding: 24px;
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.error-icon    { font-size: 1.4rem; }
.error-title   { font-family: var(--serif); font-size: 1.05rem; color: var(--accent); margin-bottom: 6px; }
.error-msg     { font-size: 0.86rem; color: var(--muted); line-height: 1.55; }

/* User list */
.user-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.user-row {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 14px 20px;
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 16px;
  transition: background 0.15s;
}
.user-row:hover { background: var(--cream); }

.user-num {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--muted);
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.user-name  { font-size: 0.92rem; font-weight: 500; }
.user-email { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); }
.user-meta  { text-align: right; }
.user-company { font-size: 0.82rem; color: var(--muted); font-style: italic; display: block; }
.user-city    { font-family: var(--mono); font-size: 0.68rem; color: var(--border); }

.api-count {
  font-family: var(--mono);
  font-size: 0.68rem;
  color: var(--muted);
  text-align: right;
  margin-top: 14px;
  letter-spacing: 0.05em;
}

/* Idle */
.idle-state {
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 52px;
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 300;
}
.idle-icon { font-size: 2rem; display: block; margin-bottom: 12px; }

/* ── Transitions ───────────────────────────────────── */
.cards-enter-active { animation: fadeUp 0.3s ease; }
.cards-leave-active { animation: fadeIn 0.2s ease reverse; }
.cards-move         { transition: transform 0.3s ease; }

.msg-enter-active,
.msg-leave-active { transition: opacity 0.25s; }
.msg-enter-from,
.msg-leave-to     { opacity: 0; }

/* ── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
  .page        { padding: 32px 20px 60px; }
  .form-grid   { grid-template-columns: 1fr; }
  .user-row    { grid-template-columns: 36px 1fr; }
  .user-meta   { display: none; }
}
</style>