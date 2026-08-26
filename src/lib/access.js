const KEY = 'cbvi_access'

export function getAccess() {
  try {
    return localStorage.getItem(KEY) || ''
  } catch {
    return ''
  }
}

export function hasAccess() {
  return getAccess().length > 0
}

export function saveAccess(password) {
  try {
    localStorage.setItem(KEY, password)
  } catch {
    // private browsing / storage disabled - they will just re-enter next visit
  }
}

export function clearAccess() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nothing to clear
  }
}

async function postPassword(password) {
  return fetch('/api/verify-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
}

export async function verifyPassword(password) {
  try {
    const res = await postPassword(password)
    if (res.ok) return { ok: true }
    if (res.status === 401) return { ok: false, error: 'Incorrect password. Please try again.' }
    return { ok: false, error: 'Unable to verify right now. Please try again in a moment.' }
  } catch {
    return { ok: false, error: 'No connection. Check your internet and try again.' }
  }
}

/**
 * Re-checks a password saved on this device, e.g. after CBVI changes it.
 * Only a definite rejection from the server clears access - a network failure
 * leaves it alone so the installed app still opens offline.
 */
export async function revalidateAccess() {
  const stored = getAccess()
  if (!stored) return false
  try {
    const res = await postPassword(stored)
    if (res.status === 401) {
      clearAccess()
      return false
    }
    return true
  } catch {
    return true
  }
}
