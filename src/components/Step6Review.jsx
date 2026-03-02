import { NavButtons, SectionTitle } from './FormField'
import { ClipboardCheck, AlertTriangle } from 'lucide-react'
import { concreteVaults, steelVaults, urnVaults, infantVaults } from '../data/products'

function ReviewRow({ label, value }) {
  if (!value || value === 'none') return null
  return (
    <div className="flex justify-between py-1.5 border-b border-gray-50">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
    </div>
  )
}

function getVaultName(list, id) {
  const item = list.find(v => v.id === id)
  return item && item.id !== 'none' ? item.name : null
}

export default function Step6Review({ form, prev, files, onSubmit }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionTitle>
        <span className="flex items-center gap-2"><ClipboardCheck size={20} /> Review Your Order</span>
      </SectionTitle>

      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold text-[#1a5c2a] uppercase tracking-wide mb-2">Director Information</p>
          <ReviewRow label="Director" value={form.directorName} />
          <ReviewRow label="Funeral Home" value={form.funeralHomeName} />
          <ReviewRow label="Email" value={form.email} />
          <ReviewRow label="Phone" value={form.phone} />
          <ReviewRow label="Address" value={form.mailingAddress} />
        </div>

        <div>
          <p className="text-xs font-semibold text-[#1a5c2a] uppercase tracking-wide mb-2">Service Details</p>
          <ReviewRow label="Cemetery" value={form.cemetery} />
          <ReviewRow label="Location" value={form.cemeteryLocation} />
          <ReviewRow label="Delivery" value={`${form.deliveryDate} ${form.deliveryDay} ${form.deliveryTime} ${form.deliveryAmPm}`} />
          <ReviewRow label="Service Type" value={form.serviceType === 'Other' ? form.serviceTypeOther : form.serviceType} />
          <ReviewRow label="Deceased" value={form.deceasedName} />
          <ReviewRow label="DOB / DOD" value={form.birthYear || form.deathYear ? `${form.birthYear || '?'} – ${form.deathYear || '?'}` : null} />
        </div>

        <div>
          <p className="text-xs font-semibold text-[#1a5c2a] uppercase tracking-wide mb-2">Burial Unit</p>
          <ReviewRow label="Concrete" value={getVaultName(concreteVaults, form.concreteVault)} />
          <ReviewRow label="Steel" value={getVaultName(steelVaults, form.steelVault)} />
          <ReviewRow label="Urn" value={getVaultName(urnVaults, form.urnVault)} />
          <ReviewRow label="Infant" value={getVaultName(infantVaults, form.infantVault)} />
        </div>

        <div>
          <p className="text-xs font-semibold text-[#1a5c2a] uppercase tracking-wide mb-2">Customization</p>
          <ReviewRow label="Color" value={form.color} />
          <ReviewRow label="Shade" value={form.shade} />
          <ReviewRow label="Emblem" value={form.emblem} />
        </div>

        <div>
          <p className="text-xs font-semibold text-[#1a5c2a] uppercase tracking-wide mb-2">Services</p>
          <ReviewRow label="Grave Open/Close" value={form.graveOpenClose} />
          <ReviewRow label="Cemetery Services" value={form.cemeteryServices} />
          <ReviewRow label="Additional" value={form.additionalServices} />
          <ReviewRow label="Special Requests" value={form.specialServiceRequests} />
          <ReviewRow label="Payment" value={form.paymentMethod === 'credit-on-file' ? 'Credit Card on File' : form.paymentMethod} />
          {files.length > 0 && <ReviewRow label="Files" value={`${files.length} file(s) attached`} />}
        </div>
      </div>

      {/* Notice */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 font-medium">
          NOTICE: Your order will be completed upon receiving a confirmation phone call.
        </p>
      </div>

      <NavButtons onPrev={prev} onNext={onSubmit} nextLabel="Place Order" />
    </div>
  )
}
