/**
 * CONTROLLER — studentController
 * src/controllers/studentController.js
 *
 * Orchestrates student-related business logic.
 * Bridges the View (components) and the Service (data layer).
 *
 * Returns reactive state and action functions for use in Vue components
 * via the Composition API (composable pattern).
 */

import { ref } from 'vue'
import {
  getFilteredStudents,
  addStudent,
  removeStudent,
  studentCount,
} from '@/services/studentService.js'
import { COURSES, YEAR_LEVELS } from '@/models/Student.js'

/**
 * useStudentController
 * Provides all state and actions a student-facing View needs.
 */
export function useStudentController() {
  // ── Filter state ──────────────────────────────────────────────────────────
  const search     = ref('')
  const yearFilter = ref('All')

  // ── Filtered list (derived from store) ───────────────────────────────────
  const filteredStudents = getFilteredStudents(search, yearFilter)

  // ── Form state ────────────────────────────────────────────────────────────
  const form = ref({
    name:   '',
    course: COURSES[0],
    year:   YEAR_LEVELS[0],
  })

  const formError    = ref('')
  const successMsg   = ref('')
  let   successTimer = null

  // ── Actions ───────────────────────────────────────────────────────────────

  /** Validates and submits the add-student form. */
  function submitAddStudent() {
    formError.value = ''

    if (!form.value.name.trim()) {
      formError.value = 'Student name is required.'
      return
    }
    if (form.value.name.trim().length < 3) {
      formError.value = 'Name must be at least 3 characters.'
      return
    }

    addStudent({
      name:   form.value.name.trim(),
      course: form.value.course,
      year:   form.value.year,
    })

    // Reset form
    form.value = { name: '', course: COURSES[0], year: YEAR_LEVELS[0] }

    // Show success message for 3 s
    successMsg.value = '✓ Student enrolled successfully!'
    clearTimeout(successTimer)
    successTimer = setTimeout(() => { successMsg.value = '' }, 3000)
  }

  /** Removes a student by ID. */
  function deleteStudent(id) {
    removeStudent(id)
  }

  /** Resets the form and clears validation errors. */
  function resetForm() {
    form.value  = { name: '', course: COURSES[0], year: YEAR_LEVELS[0] }
    formError.value = ''
  }

  /** Sets the year filter. */
  function setYearFilter(year) {
    yearFilter.value = year
  }

  return {
    // State
    search,
    yearFilter,
    filteredStudents,
    studentCount,
    form,
    formError,
    successMsg,
    // Constants
    COURSES,
    YEAR_LEVELS,
    // Actions
    submitAddStudent,
    deleteStudent,
    resetForm,
    setYearFilter,
  }
}