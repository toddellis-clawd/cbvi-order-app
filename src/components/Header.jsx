export default function Header() {
  return (
    <header className="bg-[#1a5c2a] text-white shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
        <img src="/cbvi-logo.jpg" alt="CBVI" className="h-12 w-12 rounded-lg object-cover" />
        <div>
          <h1 className="text-lg font-bold tracking-wide">Central Burial Vaults Inc</h1>
          <p className="text-[#a8d5b5] text-xs">Burial Vault Order Form</p>
        </div>
      </div>
    </header>
  )
}
