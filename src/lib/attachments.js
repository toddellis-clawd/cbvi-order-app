// Turns the files picked on step 5 into base64 attachments for the order email.
//
// Vercel caps a request body at 4.5 MB and base64 adds about a third, so photos
// are resized before sending. A 12 MP phone photo lands around 300-500 KB at
// 1600px, which is plenty for CBVI to see colour, emblem or headstone detail.

const MAX_IMAGE_DIMENSION = 1600
const JPEG_QUALITY = 0.82

// Total encoded size allowed, leaving headroom under Vercel's 4.5 MB limit for
// the order text and the rest of the JSON.
export const MAX_TOTAL_ENCODED_BYTES = 3.5 * 1024 * 1024

export function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

const isImage = (file) => typeof file.type === 'string' && file.type.startsWith('image/')

// Animated GIFs would lose their animation, and SVGs aren't photos - leave both alone.
const isResizable = (file) => isImage(file) && !['image/gif', 'image/svg+xml'].includes(file.type)

function jpegName(name) {
  return `${String(name || 'photo').replace(/\.[^.]+$/, '')}.jpg`
}

async function shrinkImage(file) {
  let bitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    // Format the browser can't decode (HEIC on some devices) - send it untouched.
    return file
  }

  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close?.()

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY))
  if (!blob) return file

  // A small PNG screenshot can come out bigger as JPEG - keep whichever is smaller.
  if (blob.size >= file.size) return file

  return new File([blob], jpegName(file.name), { type: 'image/jpeg' })
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`))
    reader.onload = () => {
      const result = String(reader.result || '')
      const comma = result.indexOf(',')
      resolve(comma === -1 ? '' : result.slice(comma + 1))
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Prepares files for sending.
 * Returns { attachments } on success, or { tooLarge: true, message } when the
 * files still exceed what the order email can carry.
 */
export async function buildAttachments(files) {
  if (!files || files.length === 0) return { attachments: [] }

  const attachments = []
  let totalEncoded = 0

  for (const file of files) {
    const prepared = isResizable(file) ? await shrinkImage(file) : file
    const content = await toBase64(prepared)
    totalEncoded += content.length
    attachments.push({ filename: prepared.name, content })
  }

  if (totalEncoded > MAX_TOTAL_ENCODED_BYTES) {
    return {
      tooLarge: true,
      message: `These files are too large to send with the order (about ${formatSize(totalEncoded)} after compression, limit ${formatSize(MAX_TOTAL_ENCODED_BYTES)}). Remove a file or two and submit again, then email the rest to centralvaults@centralvaults.com.`,
    }
  }

  return { attachments }
}
