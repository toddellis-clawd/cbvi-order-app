import { checkAccessPassword, failDelay } from './_auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.CBVI_ACCESS_PASSWORD) {
    return res.status(500).json({ error: 'Access password not configured' })
  }

  const { password } = req.body || {}

  if (!checkAccessPassword(password)) {
    await failDelay()
    return res.status(401).json({ error: 'Incorrect password' })
  }

  return res.status(200).json({ ok: true })
}
