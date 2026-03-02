import { NavButtons, SectionTitle } from './FormField'
import { Package } from 'lucide-react'
import { concreteVaults, steelVaults, urnVaults, infantVaults } from '../data/products'

function VaultSelector({ label, options, value, onChange }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-700 mb-3">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`relative rounded-xl border-2 p-3 text-left transition-all
              ${value === opt.id 
                ? 'border-[#1a5c2a] bg-[#1a5c2a]/5 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 bg-white'}`}
          >
            {opt.image && (
              <img src={opt.image} alt={opt.name} className="w-full h-24 object-cover rounded-lg mb-2" />
            )}
            <p className={`text-sm font-medium ${value === opt.id ? 'text-[#1a5c2a]' : 'text-gray-700'}`}>
              {opt.name}
            </p>
            {value === opt.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-[#1a5c2a] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Step3Vault({ form, updateForm, next, prev }) {
  const hasSelection = form.concreteVault !== 'none' || form.steelVault !== 'none' || form.urnVault !== 'none' || form.infantVault !== 'none'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionTitle>
        <span className="flex items-center gap-2"><Package size={20} /> Burial Unit Selection</span>
      </SectionTitle>
      
      <VaultSelector label="Concrete Burial Vaults" options={concreteVaults} value={form.concreteVault} onChange={v => updateForm({ concreteVault: v })} />
      <VaultSelector label="Steel Burial Vaults" options={steelVaults} value={form.steelVault} onChange={v => updateForm({ steelVault: v })} />
      <VaultSelector label="Urn Vaults" options={urnVaults} value={form.urnVault} onChange={v => updateForm({ urnVault: v })} />
      <VaultSelector label="Infant Vaults" options={infantVaults} value={form.infantVault} onChange={v => updateForm({ infantVault: v })} />

      <NavButtons onPrev={prev} onNext={next} />
    </div>
  )
}
