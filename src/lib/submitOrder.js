const API_KEY = import.meta.env.VITE_CBVI_API_KEY || ''

export function formatOrder(form, files) {
  const lines = [
    '=== CBVI BURIAL VAULT ORDER ===',
    '',
    'DIRECTOR INFORMATION',
    `Date: ${form.todayDate}`,
    `Director: ${form.directorName}`,
    `Funeral Home: ${form.funeralHomeName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Address: ${form.mailingAddress}`,
    '',
    'SERVICE DETAILS',
    `Cemetery: ${form.cemetery}`,
    `Cemetery Location: ${form.cemeteryLocation}`,
    `Delivery: ${form.deliveryDate} ${form.deliveryDay || ''} ${form.deliveryTime || ''}`,
    `Service Type: ${form.serviceType === 'Other' ? form.serviceTypeOther : form.serviceType}`,
    `Deceased: ${form.deceasedName}`,
    `DOB/DOD: ${form.birthYear || '?'} - ${form.deathYear || '?'}`,
    '',
    'BURIAL UNIT',
    `Vault: ${form.burialVault !== 'none' ? form.burialVault : 'None selected'}`,
    `Urn Vault: ${form.urnVault !== 'none' ? form.urnVault : 'None'}`,
    `Infant Vault: ${form.infantVault !== 'none' ? form.infantVault : 'None'}`,
    '',
    'CUSTOMIZATION',
    `Color: ${form.color || 'Not specified'}`,
    `Shade: ${form.shade || 'Not specified'}`,
    `Emblem: ${form.emblem || 'Not specified'}`,
    '',
    'SERVICES',
    `Grave Open: ${form.graveOpen || 'Not specified'}`,
    `Grave Close: ${form.graveClose || 'Not specified'}`,
    `Cemetery Services: ${form.cemeteryServices || 'Not specified'}`,
    `Additional Services: ${form.additionalServices || 'None'}`,
    `Special Requests: ${form.specialServiceRequests || 'None'}`,
    '',
    'PAYMENT',
    `Method: ${form.paymentMethod === 'credit-on-file' ? 'Credit Card on File' : form.paymentMethod}`,
    `Special Requests: ${form.specialRequests || 'None'}`,
    '',
    `Files Attached: ${files.length > 0 ? files.map(f => f.name).join(', ') : 'None'}`,
    '',
    '=== END ORDER ==='
  ]
  return lines.join('\n')
}

export async function submitOrder(form, files) {
  const orderText = formatOrder(form, files)

  const orders = JSON.parse(localStorage.getItem('cbvi_orders') || '[]')
  orders.push({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    form,
    fileNames: files.map(f => f.name),
    orderText,
  })
  localStorage.setItem('cbvi_orders', JSON.stringify(orders))

  try {
    const res = await fetch('/api/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({ orderText, form }),
    })
    const data = await res.json()
    return { success: true, emailSent: data.success && !data.partial, orderText }
  } catch (e) {
    console.error('API error:', e)
    return { success: true, emailSent: false, orderText, error: e.message }
  }
}
