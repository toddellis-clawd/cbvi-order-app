import { Check } from 'lucide-react'

export default function StepIndicator({ steps, current, goTo }) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center flex-1 last:flex-none">
          <button
            onClick={() => s.id < current && goTo(s.id)}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 transition-all
              ${s.id === current ? 'bg-[#1a5c2a] text-white ring-2 ring-[#1a5c2a] ring-offset-2' : ''}
              ${s.id < current ? 'bg-[#1a5c2a] text-white cursor-pointer hover:bg-[#2d7a3f]' : ''}
              ${s.id > current ? 'bg-gray-200 text-gray-400' : ''}
            `}
          >
            {s.id < current ? <Check size={14} /> : s.id}
          </button>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 ${s.id < current ? 'bg-[#1a5c2a]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
