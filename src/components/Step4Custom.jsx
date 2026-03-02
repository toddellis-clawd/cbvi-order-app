import { Select, NavButtons, SectionTitle } from './FormField'
import { Palette } from 'lucide-react'
import { colorOptions, shadeOptions, emblemOptions } from '../data/products'

export default function Step4Custom({ form, updateForm, next, prev }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionTitle>
        <span className="flex items-center gap-2"><Palette size={20} /> Customization Options</span>
      </SectionTitle>
      <div className="space-y-4">
        <Select label="Color" value={form.color} onChange={e => updateForm({ color: e.target.value })}>
          <option value="">Select Color</option>
          {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select label="Shade" value={form.shade} onChange={e => updateForm({ shade: e.target.value })}>
          <option value="">Select Shade</option>
          {shadeOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select label="Emblem" value={form.emblem} onChange={e => updateForm({ emblem: e.target.value })}>
          <option value="">Select Emblem</option>
          {emblemOptions.map(e => <option key={e} value={e}>{e}</option>)}
        </Select>
      </div>
      <NavButtons onPrev={prev} onNext={next} />
    </div>
  )
}
