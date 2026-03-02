import { CheckCircle } from 'lucide-react'

export default function Confirmation({ form, onReset }) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#1a5c2a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={36} className="text-[#1a5c2a]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1a5c2a] mb-2">Order Submitted</h1>
        <p className="text-gray-600 mb-6">
          Thank you, {form.directorName}. Your order for <strong>{form.deceasedName}</strong> has been received.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800 font-medium">
            Your order will be completed upon receiving a confirmation phone call.
          </p>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          A confirmation will be sent to <strong>{form.email}</strong>
        </p>
        <button onClick={onReset} className="w-full bg-[#1a5c2a] hover:bg-[#2d7a3f] text-white font-medium py-3 rounded-lg">
          Place Another Order
        </button>
      </div>
    </div>
  )
}
