import { useState } from 'react'
import { Lock } from 'lucide-react'
import { verifyPassword, saveAccess } from '../lib/access'

export default function PasswordGate({ onSuccess, notice = '' }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(notice)
  const [checking, setChecking] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const value = password.trim()
    if (!value || checking) return

    setChecking(true)
    setError('')
    const result = await verifyPassword(value)
    setChecking(false)

    if (result.ok) {
      saveAccess(value)
      onSuccess()
    } else {
      setError(result.error)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full">
        <div className="text-center">
          <img src="/cbvi-logo.jpg" alt="CBVI" className="h-16 w-16 rounded-lg object-cover mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#1a5c2a]">Central Burial Vaults Inc</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">Burial Vault Order Form</p>
        </div>

        <div className="bg-[#1a5c2a]/5 border border-[#1a5c2a]/15 rounded-lg p-4 mb-6 flex gap-3">
          <Lock size={18} className="text-[#1a5c2a] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            This order form is for <strong>authorized funeral homes only</strong>. Please enter the access
            password provided by Central Burial Vaults.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="cbvi-password" className="block text-sm font-medium text-gray-700 mb-1">
            Access Password
          </label>
          <input
            id="cbvi-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a] focus:outline-none bg-white"
          />

          {error && (
            <p role="alert" className="text-sm text-red-600 mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={!password.trim() || checking}
            className="w-full mt-5 bg-[#1a5c2a] hover:bg-[#2d7a3f] text-white font-medium py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {checking ? 'Checking...' : 'Enter Order Form'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Need the password? Contact Central Burial Vaults.
        </p>
      </div>
    </div>
  )
}
