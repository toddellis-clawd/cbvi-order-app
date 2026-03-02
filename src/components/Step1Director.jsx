import { Input, NavButtons, SectionTitle } from './FormField'
import { User } from 'lucide-react'

export default function Step1Director({ form, updateForm, next }) {
  const valid = form.directorName && form.funeralHomeName && form.email && form.phone

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionTitle>
        <span className="flex items-center gap-2"><User size={20} /> Funeral Director Information</span>
      </SectionTitle>
      <div className="space-y-4">
        <Input label="Today's Date" type="date" value={form.todayDate} onChange={e => updateForm({ todayDate: e.target.value })} required />
        <Input label="Funeral Director Name" value={form.directorName} onChange={e => updateForm({ directorName: e.target.value })} placeholder="Full Name" required />
        <Input label="Funeral Home Name" value={form.funeralHomeName} onChange={e => updateForm({ funeralHomeName: e.target.value })} placeholder="Funeral Home" required />
        <Input label="Email for Confirmation" type="email" value={form.email} onChange={e => updateForm({ email: e.target.value })} placeholder="email@example.com" required />
        <Input label="Phone for Confirmation" type="tel" value={form.phone} onChange={e => updateForm({ phone: e.target.value })} placeholder="(555) 555-5555" required />
        <Input label="Mailing Address" value={form.mailingAddress} onChange={e => updateForm({ mailingAddress: e.target.value })} placeholder="Street, City, State, ZIP" />
      </div>
      <NavButtons onNext={next} showPrev={false} disabled={!valid} />
    </div>
  )
}
