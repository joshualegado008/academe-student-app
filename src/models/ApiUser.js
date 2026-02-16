/**
 * MODEL — ApiUser
 * src/models/ApiUser.js
 *
 * Defines the ApiUser data shape fetched from JSONPlaceholder.
 * Maps raw API response into a clean, predictable object.
 */

/**
 * Maps a raw JSONPlaceholder user object to an ApiUser model.
 * @param {object} raw
 * @returns {ApiUser}
 */
export function createApiUser(raw = {}) {
  return {
    id:       raw.id       ?? 0,
    name:     raw.name     ?? 'Unknown',
    email:    raw.email    ?? '—',
    phone:    raw.phone    ?? '—',
    website:  raw.website  ?? '—',
    company:  raw.company?.name ?? '—',
    city:     raw.address?.city ?? '—',
  }
}