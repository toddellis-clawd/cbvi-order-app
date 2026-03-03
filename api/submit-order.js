export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // API key check
  const apiKey = req.headers['x-api-key']
  if (!apiKey || apiKey !== process.env.CBVI_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { orderText, form } = req.body

  if (!orderText || !form) {
    return res.status(400).json({ error: 'Missing order data' })
  }

  const errors = []

  // Send email via Resend
  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CBVI Orders <orders@resend.dev>',
        to: ['centralvaults@centralvaults.com'],
        subject: `New Burial Vault Order — ${form.funeralHomeName || 'Unknown'} — ${form.deceasedName || 'Unknown'}`,
        text: orderText,
      }),
    })
    const emailData = await emailRes.json()
    if (!emailRes.ok) {
      errors.push(`Email error: ${JSON.stringify(emailData)}`)
    }
  } catch (e) {
    errors.push(`Email error: ${e.message}`)
  }

  if (errors.length > 0) {
    return res.status(207).json({ success: true, partial: true, errors })
  }

  return res.status(200).json({ success: true })
}
