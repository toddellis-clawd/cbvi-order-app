import { Input, Select, NavButtons, SectionTitle } from './FormField'
import { MapPin } from 'lucide-react'
import { serviceTypes, daysOfWeek, deliveryTimes } from '../data/products'

export default function Step2Service({ form, updateForm, next, prev }) {
  // 24-hour minimum lead time — calculate tomorrow's date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]
  
  const valid = form.cemetery && form.deliveryDate && form.deceasedName

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionTitle>
        <span className="flex items-center gap-2"><MapPin size={20} /> Service & Delivery Details</span>
      </SectionTitle>
      <div className="space-y-4">
        <Input label="Cemetery" value={form.cemetery} onChange={e => updateForm({ cemetery: e.target.value })} placeholder="Cemetery Name" required />
        <Input label="Cemetery Location" value={form.cemeteryLocation} onChange={e => updateForm({ cemeteryLocation: e.target.value })} placeholder="Section, lot, etc." />
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="Delivery Date" type="date" value={form.deliveryDate} onChange={e => updateForm({ deliveryDate: e.target.value })} min={minDate} required />
          <Select label="Delivery Day" value={form.deliveryDay} onChange={e => updateForm({ deliveryDay: e.target.value })}>
            <option value="">Select Day</option>
            {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
          </Select>
        </div>

        <Select label="Delivery Time" value={form.deliveryTime} onChange={e => updateForm({ deliveryTime: e.target.value })}>
          <option value="">Select Time</option>
          {deliveryTimes.map(t => <option key={t} value={t}>{t}</option>)}
        </Select>

        <div className="grid grid-cols-2 gap-4">
          <Select label="Type of Service" value={form.serviceType} onChange={e => updateForm({ serviceType: e.target.value })}>
            <option value="">Select Type</option>
            {serviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
          {form.serviceType === 'Other' && (
            <Input label="Specify" value={form.serviceTypeOther} onChange={e => updateForm({ serviceTypeOther: e.target.value })} placeholder="Other service type" />
          )}
        </div>

        <div className="border-t border-gray-100 pt-4 mt-4">
          <p className="text-sm font-medium text-gray-500 mb-3">Deceased Information</p>
          <Input label="Name of Deceased" value={form.deceasedName} onChange={e => updateForm({ deceasedName: e.target.value })} placeholder="Full Name" required />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input label="Birth Year (DOB)" type="number" value={form.birthYear} onChange={e => updateForm({ birthYear: e.target.value })} placeholder="YYYY" min="1900" max="2026" />
            <Input label="Year of Death (DOD)" type="number" value={form.deathYear} onChange={e => updateForm({ deathYear: e.target.value })} placeholder="YYYY" min="1900" max="2026" />
          </div>
        </div>
      </div>
      <NavButtons onPrev={prev} onNext={next} disabled={!valid} />
    </div>
  )
}
