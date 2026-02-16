/**
 * SERVICE — apiService
 * src/services/apiService.js
 *
 * Handles HTTP communication with external APIs.
 * Returns raw data — model mapping happens in the controller.
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Fetches the list of users from JSONPlaceholder.
 * @returns {Promise<object[]>}
 * @throws {Error} on non-2xx responses or network failures
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`)

  if (!response.ok) {
    throw new Error(
      `API request failed — HTTP ${response.status}: ${response.statusText}`
    )
  }

  return response.json()
}