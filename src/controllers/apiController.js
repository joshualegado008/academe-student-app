/**
 * CONTROLLER — apiController
 * src/controllers/apiController.js
 *
 * Orchestrates external API fetching logic.
 * Delegates HTTP calls to apiService and maps results to ApiUser models.
 */

import { ref } from 'vue'
import { fetchUsers } from '@/services/apiService.js'
import { createApiUser } from '@/models/ApiUser.js'

/**
 * useApiController
 * Provides reactive API state and the fetch action.
 */
export function useApiController() {
  const users    = ref([])
  const loading  = ref(false)
  const error    = ref(null)
  const fetched  = ref(false)

  /**
   * Fetches users from the API, maps them to ApiUser models,
   * and manages loading / error state.
   */
  async function loadUsers() {
    loading.value = true
    error.value   = null
    users.value   = []
    fetched.value = true

    try {
      const raw = await fetchUsers()
      // Map raw objects → ApiUser models
      users.value = raw.map(createApiUser)
    } catch (err) {
      error.value = err.message ?? 'An unexpected error occurred.'
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetched,
    loadUsers,
  }
}