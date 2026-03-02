import { useState } from 'react'
import Header from './components/Header'
import StepIndicator from './components/StepIndicator'
import Step1Director from './components/Step1Director'
import Step2Service from './components/Step2Service'
import Step3Vault from './components/Step3Vault'
import Step4Custom from './components/Step4Custom'
import Step5Services from './components/Step5Services'
import Step6Review from './components/Step6Review'
import Confirmation from './components/Confirmation'

const STEPS = [
  { id: 1, label: 'Director Info' },
  { id: 2, label: 'Service Details' },
  { id: 3, label: 'Burial Unit' },
  { id: 4, label: 'Customization' },
  { id: 5, label: 'Services & Upload' },
  { id: 6, label: 'Review & Submit' },
]

const initialForm = {
  // Step 1 - Director Info
  todayDate: new Date().toISOString().split('T')[0],
  directorName: '',
  funeralHomeName: '',
  email: '',
  phone: '',
  mailingAddress: '',
  // Step 2 - Service Details
  cemetery: '',
  cemeteryLocation: '',
  deliveryDate: '',
  deliveryDay: '',
  deliveryTime: '',
  deliveryAmPm: 'AM',
  serviceType: '',
  serviceTypeOther: '',
  deceasedName: '',
  birthYear: '',
  deathYear: '',
  // Step 3 - Burial Unit
  concreteVault: 'none',
  steelVault: 'none',
  urnVault: 'none',
  infantVault: 'none',
  // Step 4 - Customization
  color: '',
  shade: '',
  emblem: '',
  // Step 5 - Services
  graveOpenClose: '',
  cemeteryServices: '',
  additionalServices: '',
  specialServiceRequests: '',
  // Payment
  paymentMethod: 'credit-on-file',
  specialRequests: '',
}

export default function App() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [files, setFiles] = useState([])

  const updateForm = (updates) => setForm(prev => ({ ...prev, ...updates }))
  const next = () => setStep(s => Math.min(s + 1, 6))
  const prev = () => setStep(s => Math.max(s - 1, 1))
  const goTo = (s) => setStep(s)

  const handleSubmit = () => {
    console.log('Order submitted:', form, files)
    setSubmitted(true)
  }

  if (submitted) return <Confirmation form={form} onReset={() => { setForm(initialForm); setFiles([]); setSubmitted(false); setStep(1) }} />

  const stepProps = { form, updateForm, next, prev, goTo }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <StepIndicator steps={STEPS} current={step} goTo={goTo} />
        <div className="mt-6">
          {step === 1 && <Step1Director {...stepProps} />}
          {step === 2 && <Step2Service {...stepProps} />}
          {step === 3 && <Step3Vault {...stepProps} />}
          {step === 4 && <Step4Custom {...stepProps} />}
          {step === 5 && <Step5Services {...stepProps} files={files} setFiles={setFiles} />}
          {step === 6 && <Step6Review {...stepProps} files={files} onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  )
}
