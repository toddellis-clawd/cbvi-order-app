import { checkAccessPassword } from './_auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // API key check
  const apiKey = req.headers['x-api-key']
  if (!apiKey || apiKey !== process.env.CBVI_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Shared funeral-home access password - blocks orders from anyone who
  // skips the password screen and posts here directly.
  if (!checkAccessPassword(req.headers['x-access-password'])) {
    return res.status(401).json({ error: 'Unauthorized', reason: 'access-password' })
  }

  const { orderText, form } = req.body

  if (!orderText || !form) {
    return res.status(400).json({ error: 'Missing order data' })
  }

  const errors = []

  const from = (process.env.ORDER_FROM_EMAIL || 'CBVI Orders <orders@resend.dev>').trim()
  // Comma-separated list, e.g. "karyn.e@centralvaults.com,richard.c@centralvaults.com"
  const staff = (process.env.ORDER_TO_EMAIL || 'centralvaults@centralvaults.com')
    .split(',').map(s => s.trim()).filter(Boolean)

  // Send the order to CBVI via Resend. Replying goes straight to the orderer.
  try {
    const emailData = await sendEmail({
      from,
      to: staff,
      reply_to: isEmail(form.email) ? form.email.trim() : undefined,
      subject: `New Burial Vault Order — ${form.funeralHomeName || 'Unknown'} — ${form.deceasedName || 'Unknown'}`,
      text: orderText,
    })
    if (emailData.error) {
      errors.push(`Email error: ${JSON.stringify(emailData.error)}`)
    }
  } catch (e) {
    errors.push(`Email error: ${e.message}`)
  }

  // Send a confirmation copy to the person who placed the order. A failure here
  // is logged but doesn't mark the order as failed - CBVI already has it.
  let confirmationSent = false
  if (isEmail(form.email)) {
    // Replies go to CBVI staff on the sending domain, not personal copies.
    const fromDomain = ((from.match(/@([^>\s]+)/) || [])[1] || '').toLowerCase()
    const replyTo = staff.filter(addr => fromDomain && addr.toLowerCase().endsWith(`@${fromDomain}`))
    try {
      const confirmData = await sendEmail({
        from,
        to: [form.email.trim()],
        reply_to: replyTo.length > 0 ? replyTo : undefined,
        subject: `Your CBVI Burial Vault Order — ${form.deceasedName || 'Order'}`,
        text: [
          `Thank you${form.directorName ? `, ${form.directorName}` : ''}. CBVI has received your burial vault order.`,
          '',
          'Your order will be completed upon receiving a confirmation email from CBVI.',
          '',
          'A copy of your order is below for your records.',
          '',
          orderText,
        ].join('\n'),
      })
      if (confirmData.error) {
        console.error('Confirmation email error:', JSON.stringify(confirmData.error))
      } else {
        confirmationSent = true
      }
    } catch (e) {
      console.error('Confirmation email error:', e.message)
    }
  }

  if (errors.length > 0) {
    return res.status(207).json({ success: true, partial: true, confirmationSent, errors })
  }

  return res.status(200).json({ success: true, confirmationSent })
}

async function sendEmail(payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  return res.ok ? data : { error: data }
}

function isEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
