/**
 * SERVICE — studentService
 * src/services/studentService.js
 *
 * Handles all student data operations (in-memory store).
 * Controllers call this service — Views never touch data directly.
 */

import { ref, computed } from 'vue'
import {
  getSeedStudents,
  createStudent,
  generateStudentId,
  randomGpa,
} from '@/models/Student.js'

// ── In-memory store (reactive) ────────────────────────────────────────────────
const _students = ref(getSeedStudents())

// ── Exported helpers ──────────────────────────────────────────────────────────

/** Read-only reactive reference to all students */
export const students = computed(() => _students.value)

/**
 * Returns students filtered by a search string and/or year level.
 * @param {string} search
 * @param {string} yearFilter  — 'All' or a specific year level
 * @returns {ComputedRef<Student[]>}
 */
export function getFilteredStudents(search, yearFilter) {
  return computed(() =>
    _students.value.filter((s) => {
      const q = search.value.trim().toLowerCase()
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      const matchYear =
        yearFilter.value === 'All' || s.year === yearFilter.value
      return matchSearch && matchYear
    })
  )
}

/**
 * Adds a new student to the store.
 * @param {{ name: string, course: string, year: string }} fields
 * @returns {Student}  the newly created student
 */
export function addStudent({ name, course, year }) {
  const student = createStudent({
    id:       generateStudentId(_students.value.length),
    name,
    course,
    year,
    gpa:      randomGpa(),
    email:    `${name.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}@uni.edu`,
    enrolled: String(new Date().getFullYear()),
  })
  _students.value.push(student)
  return student
}

/**
 * Removes a student from the store by ID.
 * @param {string} id
 */
export function removeStudent(id) {
  _students.value = _students.value.filter((s) => s.id !== id)
}

/** Total student count */
export const studentCount = computed(() => _students.value.length)