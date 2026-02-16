<template>
  <!-- COMPONENT: StudentComponent -->
  <!-- Props: student (Object) -->
  <!-- Emits: remove(id) -->
  <article
    class="student-card"
    :class="{ 'student-card--expanded': isExpanded }"
    aria-label="Student card"
  >
    <!-- Top bar accent line -->
    <div class="card-accent-line" />

    <!-- Card header -->
    <div class="card-header">
      <div class="avatar" :style="{ background: avatarColor }">
        {{ initials }}
      </div>
      <div class="card-identity">
        <div class="card-id">{{ student.id }}</div>
        <h3 class="card-name">{{ student.name }}</h3>
      </div>
    </div>

    <!-- Meta info -->
    <dl class="card-meta">
      <div class="meta-row">
        <dt class="meta-label">Course</dt>
        <dd class="meta-value">{{ student.course }}</dd>
      </div>
      <div class="meta-row">
        <dt class="meta-label">Year</dt>
        <dd>
          <span class="year-badge">{{ student.year }}</span>
        </dd>
      </div>
      <div class="meta-row">
        <dt class="meta-label">GPA</dt>
        <dd
          class="meta-value"
          :class="{ 'meta-value--high': parseFloat(student.gpa) >= 3.7 }"
        >
          {{ student.gpa }}
        </dd>
      </div>
    </dl>

    <!-- Footer row -->
    <div class="card-footer">
      <div class="enrolled-info">
        <span class="status-dot" aria-hidden="true" />
        Enrolled {{ student.enrolled }}
      </div>

      <!-- Event handler: toggles expanded detail (Part B requirement) -->
      <button class="toggle-btn" @click="toggleExpand">
        {{ isExpanded ? 'Less ▲' : 'More ▼' }}
      </button>
    </div>

    <!-- Expandable detail section -->
    <Transition name="detail">
      <div v-if="isExpanded" class="card-detail">
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-val">{{ student.email }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Since</span>
          <span class="detail-val">{{ student.enrolled }}</span>
        </div>
        <div class="detail-actions">
          <!-- Emits 'remove' event to parent (controller handles deletion) -->
          <button class="btn-remove" @click="$emit('remove', student.id)">
            Remove Student
          </button>
        </div>
      </div>
    </Transition>
  </article>
</template>

<script setup>
/**
 * StudentComponent
 * Displays a single student's information as an interactive card.
 *
 * Props:
 *   student {Object} — a Student model object
 *
 * Emits:
 *   remove(id) — when the Remove button is clicked
 */
import { ref, computed } from 'vue'

const props = defineProps({
  student: {
    type:     Object,
    required: true,
  },
})

defineEmits(['remove'])

// ── Local state ─────────────────────────────────────────────────────────────
const isExpanded = ref(false)

// ── Computed ─────────────────────────────────────────────────────────────────
const initials = computed(() =>
  props.student.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
)

// Deterministic color per student based on ID number
const AVATAR_COLORS = ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#2c3e50', '#1b4332']
const avatarColor = computed(() => {
  const num = parseInt(props.student.id.replace('STU-', '')) || 1
  return AVATAR_COLORS[(num - 1) % AVATAR_COLORS.length]
})

// ── Methods ──────────────────────────────────────────────────────────────────
function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.student-card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 22px;
  overflow: hidden;
  cursor: default;
  transition: transform 0.2s, box-shadow 0.2s;
}
.student-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.student-card--expanded {
  box-shadow: var(--shadow-lg);
}

/* Accent line slides in on hover */
.card-accent-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.student-card:hover .card-accent-line,
.student-card--expanded .card-accent-line {
  transform: scaleX(1);
}

/* Header */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 16px;
}
.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  color: #f0ebe0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--serif);
  font-size: 1rem;
  flex-shrink: 0;
}
.card-id {
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--muted);
  letter-spacing: 0.09em;
  margin-bottom: 2px;
}
.card-name {
  font-family: var(--serif);
  font-size: 1.18rem;
  letter-spacing: -0.01em;
  line-height: 1.2;
  font-weight: 400;
}

/* Meta */
.card-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.meta-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.meta-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--muted);
  min-width: 54px;
}
.meta-value {
  font-size: 0.87rem;
  font-weight: 500;
  color: var(--ink);
}
.meta-value--high { color: #2e7d32; }

.year-badge {
  font-family: var(--mono);
  font-size: 0.63rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 9px;
  border-radius: 2px;
  background: var(--accent-soft);
  color: var(--accent);
}

/* Footer */
.card-footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.enrolled-info {
  font-size: 0.78rem;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 7px;
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #43a047;
  animation: pulse 2.2s infinite;
  display: inline-block;
}
.toggle-btn {
  font-family: var(--mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  background: none;
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 4px 11px;
  cursor: pointer;
  color: var(--muted);
  transition: all 0.15s;
}
.toggle-btn:hover {
  color: var(--ink);
  border-color: var(--ink);
}

/* Expandable detail */
.card-detail {
  margin-top: 14px;
  background: var(--cream);
  border-radius: 4px;
  padding: 14px;
}
.detail-row {
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 0.83rem;
}
.detail-row:last-of-type { margin-bottom: 0; }
.detail-label {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--muted);
  min-width: 44px;
}
.detail-val { color: var(--ink); }
.detail-actions {
  margin-top: 12px;
  text-align: right;
}
.btn-remove {
  font-family: var(--mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  background: none;
  border: 1px solid #f5c4be;
  color: var(--accent);
  padding: 4px 12px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-remove:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* Transition */
.detail-enter-active,
.detail-leave-active {
  transition: all 0.22s ease;
  overflow: hidden;
}
.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(-6px);
  max-height: 0;
}
.detail-enter-to,
.detail-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 200px;
}
</style>