import { Select, TextArea, NavButtons, SectionTitle } from './FormField'
import { Wrench, Upload, X } from 'lucide-react'
import { useRef } from 'react'

export default function Step5Services({ form, updateForm, next, prev, files, setFiles }) {
  const fileRef = useRef()

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const newFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionTitle>
        <span className="flex items-center gap-2"><Wrench size={20} /> Services & Documents</span>
      </SectionTitle>
      <div className="space-y-4">
        <Select label="Grave Open/Close" value={form.graveOpenClose} onChange={e => updateForm({ graveOpenClose: e.target.value })}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
        <Select label="Cemetery Services" value={form.cemeteryServices} onChange={e => updateForm({ cemeteryServices: e.target.value })}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
        <TextArea label="Additional Services" value={form.additionalServices} onChange={e => updateForm({ additionalServices: e.target.value })} rows={3} placeholder="Describe any additional services needed..." />
        <TextArea label="Special Service Requests" value={form.specialServiceRequests} onChange={e => updateForm({ specialServiceRequests: e.target.value })} rows={3} placeholder="Any special requests..." />

        {/* File Upload */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"><Upload size={16} /> File Upload</p>
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#1a5c2a] hover:bg-[#1a5c2a]/5 transition-colors"
          >
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Drag & drop files here, or <span className="text-[#1a5c2a] font-medium">click to browse</span></p>
            <p className="text-xs text-gray-400 mt-1">Permits, documents, etc.</p>
            <input ref={fileRef} type="file" multiple onChange={handleFiles} className="hidden" />
          </div>
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-700 truncate">{f.name}</span>
                  <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Payment Method</p>
          <Select value={form.paymentMethod} onChange={e => updateForm({ paymentMethod: e.target.value })}>
            <option value="credit-on-file">Credit Card on File</option>
            <option value="invoice">Invoice</option>
            <option value="other">Other</option>
          </Select>
          <div className="mt-4">
            <TextArea label="Special Requests" value={form.specialRequests} onChange={e => updateForm({ specialRequests: e.target.value })} rows={2} placeholder="Any payment or billing notes..." />
          </div>
        </div>
      </div>
      <NavButtons onPrev={prev} onNext={next} />
    </div>
  )
}
