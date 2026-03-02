export function Input({ label, required, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
      <input {...props} className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a] focus:outline-none bg-white ${props.className || ''}`} />
    </div>
  )
}

export function Select({ label, required, children, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
      <select {...props} className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a] focus:outline-none bg-white ${props.className || ''}`}>
        {children}
      </select>
    </div>
  )
}

export function TextArea({ label, required, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
      <textarea {...props} className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-[#1a5c2a] focus:ring-1 focus:ring-[#1a5c2a] focus:outline-none bg-white resize-none ${props.className || ''}`} />
    </div>
  )
}

export function NavButtons({ onPrev, onNext, nextLabel = 'Continue', prevLabel = 'Back', showPrev = true, disabled = false }) {
  return (
    <div className="flex justify-between mt-8">
      {showPrev ? (
        <button onClick={onPrev} className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
          {prevLabel}
        </button>
      ) : <div />}
      <button onClick={onNext} disabled={disabled}
        className="px-8 py-2.5 text-sm font-medium text-white bg-[#1a5c2a] hover:bg-[#2d7a3f] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
        {nextLabel}
      </button>
    </div>
  )
}

export function SectionTitle({ children }) {
  return <h2 className="text-lg font-semibold text-[#1a5c2a] mb-4 pb-2 border-b border-[#1a5c2a]/20">{children}</h2>
}
