import { createHash, timingSafeEqual } from 'node:crypto'

// Hash both sides so the comparison is constant-time regardless of length.
const sha256 = (value) => createHash('sha256').update(String(value ?? ''), 'utf8').digest()

/**
 * Checks the shared funeral-home access password against CBVI_ACCESS_PASSWORD.
 * Fails closed: if the env var is missing, nothing is authorized.
 */
export function checkAccessPassword(submitted) {
  const expected = process.env.CBVI_ACCESS_PASSWORD
  if (!expected || !submitted) return false
  return timingSafeEqual(sha256(String(submitted).trim()), sha256(expected.trim()))
}

// Small delay on a bad password to slow down guessing.
export const failDelay = () => new Promise(resolve => setTimeout(resolve, 400))
